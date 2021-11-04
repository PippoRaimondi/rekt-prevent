import { addMinutes, format } from 'date-fns';

import { ValidationError } from '../../application/errors/ValidationError';
import { AdminPasswordResetRepository } from '../../application/repositories/AdminPasswordResetRepository';
import { AdminRepository } from '../../application/repositories/AdminRepository';
import { AuthService } from '../../application/services/AuthService';
import { UniqueIdentifierService } from '../../application/services/UniqueIdentifierService';
import { Admin } from '../../domain/entities/Admin';
import { AdminPasswordReset } from '../../domain/entities/AdminPasswordReset';
import { ResetPasswordRequest } from '../../domain/interfaces/ResetPasswordRequest';
import {
  AdminResponse,
  AdminResponseWithToken,
} from '../../domain/interfaces/responses/AdminResponse';
import { AdminMapper } from '../../domain/mappers/AdminMapper';
import { ResetPasswordValidator } from '../../domain/validators/ResetPasswordValidator';
import { AdminMailerService } from './AdminMailerService';

export class AdminService {
  private readonly resetPasswordValidator: ResetPasswordValidator;

  private readonly repository: AdminRepository;
  private readonly passwordResetRepository: AdminPasswordResetRepository;

  private readonly authService: AuthService;
  private readonly mailer: AdminMailerService;
  private readonly uniqueIdentifierService: UniqueIdentifierService;

  /**
   * In how much time the link should expire (in minutes)
   */
  private readonly EXPIRES_IN_MINUTES = 1_440;

  constructor(
    resetPasswordValidator: ResetPasswordValidator,
    repository: AdminRepository,
    passwordResetRepository: AdminPasswordResetRepository,
    authService: AuthService,
    mailer: AdminMailerService,
    uniqueIdentifierService: UniqueIdentifierService
  ) {
    this.resetPasswordValidator = resetPasswordValidator;

    this.repository = repository;
    this.passwordResetRepository = passwordResetRepository;

    this.authService = authService;
    this.mailer = mailer;
    this.uniqueIdentifierService = uniqueIdentifierService;
  }

  async get(id: number): Promise<AdminResponse> {
    const admin = await this.repository.findById(id);

    return AdminMapper.map(admin);
  }

  async generateToken(entity: Admin): Promise<AdminResponseWithToken> {
    const token = this.authService.generateToken(entity);

    return {
      token,
      admin: AdminMapper.map(entity),
    };
  }

  async resetPassword(request: ResetPasswordRequest): Promise<AdminResponse> {
    this.resetPasswordValidator.validate(request);

    const { loggedUser, password } = request;
    const newPassword = await this.authService.generatePassword(password);

    const admin: Admin = {
      ...(loggedUser as Admin),
      password: newPassword,
    };

    await this.repository.update(admin);

    return AdminMapper.map(admin);
  }

  async forgotPassword(email: string): Promise<void> {
    const admin = await this.repository.findByEmail(email);

    const token = this.uniqueIdentifierService.create();

    // TODO: Create a service to encapsulate date-fns usage
    const expiresAt = addMinutes(new Date(), this.EXPIRES_IN_MINUTES);

    // Create a password reset record
    await this.passwordResetRepository.create({
      token,
      adminId: admin.id,
      expiresAt,
      verifiedAt: null,
    });

    // Send an forgot password email
    const { name } = admin;
    const expiresAtFormatted = format(expiresAt, 'dd/MM/yyyy HH:mm');
    await this.mailer.forgotPassword(name, email, token, expiresAtFormatted);
  }

  async validateForgotPasswordToken(token: string): Promise<AdminResponseWithToken> {
    const passwordReset = await this.passwordResetRepository.findByToken(token);
    if (this.isPasswordResetExpired(passwordReset) || passwordReset.verifiedAt) {
      // TODO Implement a message repository
      throw new ValidationError('O link já expirou.');
    }

    // Update the verifiedAt on password reset
    await this.passwordResetRepository.updateVerifiedAt({
      ...passwordReset,
      verifiedAt: new Date(),
    });

    const { admin } = passwordReset;

    // Generate a token for authentication
    const authToken = this.authService.generateToken(admin);

    return {
      token: authToken,
      admin: AdminMapper.map(admin),
    };
  }

  private isPasswordResetExpired(passwordReset: AdminPasswordReset): boolean {
    const { expiresAt } = passwordReset;
    const now = new Date();

    return now.getTime() > expiresAt.getTime();
  }
}
