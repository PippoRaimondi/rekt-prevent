import { addMinutes, format } from 'date-fns';

import { ValidationError } from '../../application/errors/ValidationError';
import { UserRepository } from '../../application/repositories/UserRepository';
import { AuthService } from '../../application/services/AuthService';
import { UniqueIdentifierService } from '../../application/services/UniqueIdentifierService';
import { PaginationUtils } from '../../application/utils/PaginationUtils';
import { Portfolio } from '../../domain/entities/Portfolio';
import { User, UserStatus } from '../../domain/entities/User';
import { UserPasswordReset } from '../../domain/entities/UserPasswordReset';
import { UserVerification } from '../../domain/entities/UserVerification';
import { ListUserRequest } from '../../domain/interfaces/admin/ListUserRequest';
import {
  CreateUserRequest,
} from '../../domain/interfaces/admin/UserRequest';
import { ResetPasswordRequest } from '../../domain/interfaces/ResetPasswordRequest';
import {
  ListUserResponse,
  UserResponse,
  UserResponseWithToken,
} from '../../domain/interfaces/responses/UserResponse';
import { UserVerificationResponse } from '../../domain/interfaces/responses/UserVerificationResponse';
import { UpdateUserRequest } from '../../domain/interfaces/UpdateUserRequest';
import { PaginationMapper } from '../../domain/mappers/PaginationMapper';
import { UserMapper } from '../../domain/mappers/UserMapper';
import { UserVerificationMapper } from '../../domain/mappers/UserVerificationMapper';
import { CreateUserValidator } from '../../domain/validators/admin/CreateUserValidator';
import { ResetPasswordValidator } from '../../domain/validators/ResetPasswordValidator';
import { UpdateUserValidator } from '../../domain/validators/UpdateUserValidator';
import { UserOrderBy, UserSortBy, UserWithRelations } from '../interfaces/User';
import { UserPasswordResetWithRelations } from '../interfaces/UserPasswordReset';
import { UserVerificationWithRelations } from '../interfaces/UserVerification';
import { UserSettingsRepository } from '../repositories';
import { UserAggregatorRepository } from '../repositories/UserAggregatorRepository';
import { UserPasswordResetRepository } from '../repositories/UserPasswordResetRepository';
import { UserVerificationRepository } from '../repositories/UserVerificationRepository';
import { UserMailerService } from './UserMailerService';

export class UserService {
  /**
   * Default user status on create an user
   */
  private readonly DEFAULT_USER_STATUS = UserStatus.PENDING;

  /**
   * Total of users per page
   */
  private readonly USERS_PER_PAGE = 20;

  /**
   * In how much time the link should expire (in minutes)
   */
  private readonly EXPIRES_IN_MINUTES = 1_440; // 1d

  constructor(
    private readonly createUserValidator: CreateUserValidator,
    private readonly resetPasswordValidator: ResetPasswordValidator,
    private readonly updateUserValidator: UpdateUserValidator,
    private readonly repository: UserRepository,
    private readonly userAggregatorRepository: UserAggregatorRepository,
    private readonly verificationRepository: UserVerificationRepository,
    private readonly passwordResetRepository: UserPasswordResetRepository,
    private readonly authService: AuthService,
    private readonly mailer: UserMailerService,
    private readonly uniqueIdentifierService: UniqueIdentifierService
  ) {}

  async list(request: ListUserRequest): Promise<ListUserResponse> {
    const { filter, page, orderBy } = request;
    const offset = PaginationUtils.getOffsetByPage(page, this.USERS_PER_PAGE);

    const [users, count] = await this.repository.findAll(
      filter,
      // TODO Fix it!
      // { sortColumn: (orderBy.sort as UserSortBy), direction: orderBy.direction },
      { sortColumn: UserSortBy.CREATED_AT, direction: 'ASC' },
      this.USERS_PER_PAGE,
      offset
    );

    return {
      users: users.map((user) => UserMapper.map(user)),
      pagination: PaginationMapper.map(page, count, this.USERS_PER_PAGE),
    };
  }

  async get(id: number): Promise<UserResponse> {
    const user = await this.repository.findById(id);

    return UserMapper.map(user);
  }

  async getByEmailOrNull(email: string): Promise<UserResponse | null> {
    try {
      const user = await this.repository.findByEmail(email);

      return UserMapper.map(user);
    } catch (error) {
      return null;
    }
  }

  async create(request: CreateUserRequest): Promise<UserResponse> {
    this.createUserValidator.validate(request);

    const { createdBy, email, name, phone, password } = request;

    const encodedPassword = await this.authService.generatePassword(password as string);

    const user: User = await this.repository.create({
      name,
      status: this.DEFAULT_USER_STATUS,
      email,
      password: encodedPassword,
      phone: phone || null,
      createdById: createdBy?.id || 0, // System
    });

    // Create verification token and send welcome email
    await this.createVerificationTokenAndSendWelcomeEmail(user);

    return UserMapper.map(user);
  }

  async update(request: UpdateUserRequest): Promise<UserResponse> {
    this.updateUserValidator.validate(request);

    let encodedPassword: string | undefined;
    const { loggedUser, currentPassword, newPassword } = request;
    if (currentPassword) {
      // Validate the password
      const isSamePassword = await this.authService.comparePassword(
        currentPassword,
        loggedUser.password
      );
      if (!isSamePassword) {
        // TODO Implement a message repository
        throw new ValidationError('A senha atual não é válida.');
      }

      encodedPassword = await this.authService.generatePassword(newPassword as string);
    }

    const user = {
      ...loggedUser,
      name: request.name || loggedUser.name,
      phone: request.phone || loggedUser.phone,
      password: encodedPassword || loggedUser.password,
      status: UserStatus.ACTIVE
    };

    // Update user
    await this.repository.update(user);

    return UserMapper.map(user);
  }

  updateLastLoginAt(user: User): Promise<boolean> {
    return this.repository.update({
      ...user,
      lastLoginAt: new Date(),
    });
  }

  async delete(id: number): Promise<UserResponse> {
    const user = await this.repository.findById(id);

    await this.repository.delete(user);

    return UserMapper.map(user);
  }

  async validateWelcomeToken(token: string): Promise<UserResponseWithToken> {
    const {
      user,
      verifiedAt,
    }: UserVerificationWithRelations = await this.verificationRepository.findByToken(token);
    if (verifiedAt || user?.status !== this.DEFAULT_USER_STATUS) {
      // TODO Implement a message repository
      throw new ValidationError('O usuário já está ativo.');
    }

    // Update the verifiedAt on user verification
    await this.verificationRepository.updateVerifiedAt({
      userId: user.id,
      token,
      verifiedAt: new Date(),
    });

    // Update user status
    user.status = UserStatus.ACTIVE;
    await this.repository.update(user);

    // Generate a token for authentication
    const authToken = this.authService.generateToken(user);

    return {
      token: authToken,
      user: UserMapper.map(user),
    };
  }

  async resendInvite(id: number): Promise<UserVerificationResponse> {
    const user = await this.repository.findById(id);
    if (user.status === UserStatus.ACTIVE) {
      // TODO Implement a message repository
      throw new ValidationError(
        'O usuário já está ativo, portanto o convite não pode ser re-enviado.'
      );
    }

    const userVerification = await this.createVerificationTokenAndSendWelcomeEmail(user);

    return UserVerificationMapper.map(userVerification);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);
    if (user.status !== UserStatus.ACTIVE) {
      // REMARKS Confirm with business if we need to change the message
      throw new ValidationError('Não é possível resetar a senha, entre em contato com o suporte.');
    }

    const token = this.uniqueIdentifierService.create();

    // TODO: Create a service to encapsulate date-fns usage
    const expiresAt = addMinutes(new Date(), this.EXPIRES_IN_MINUTES);

    const passwordReset: UserPasswordReset = {
      userId: user.id,
      token,
      expiresAt,
      verifiedAt: null,
    };

    await this.passwordResetRepository.create(passwordReset);
    await this.sendForgotEmail({
      ...passwordReset,
      user,
    });
  }

  async validateForgotPasswordToken(token: string): Promise<UserResponseWithToken> {
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

    // REMARKS: Load the user (again) because we are having some issue to load together in the .findByToken
    const user = await this.repository.findById(passwordReset.user.id!);

    // Generate a token for authentication
    const authToken = this.authService.generateToken(user);

    return {
      token: authToken,
      user: UserMapper.map(user),
    };
  }

  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    this.resetPasswordValidator.validate(request);

    const { password, loggedUser } = request;
    const newPassword = await this.authService.generatePassword(password);

    await this.repository.update({
      ...(loggedUser as User),
      password: newPassword,
    });
  }

  private async createVerificationTokenAndSendWelcomeEmail(user: User): Promise<UserVerification> {
    const userVerification = await this.createVerificationToken(user);

    await this.sendWelcomeEmail({
      ...userVerification,
      user,
    });

    return userVerification;
  }

  private async createVerificationToken(user: User): Promise<UserVerification> {
    const token = this.uniqueIdentifierService.create();

    const userVerification: UserVerification = {
      token,
      userId: user.id,
      verifiedAt: null,
    };
    await this.verificationRepository.create(userVerification);

    return userVerification;
  }

  private isPasswordResetExpired(passwordReset: UserPasswordReset): boolean {
    const { expiresAt } = passwordReset;
    const now = new Date();

    return now.getTime() > expiresAt.getTime();
  }

  private async sendWelcomeEmail(userVerification: UserVerificationWithRelations): Promise<void> {
    const { token } = userVerification;
    const { name, email } = userVerification.user as User;

    await this.mailer.sendWelcomeEmail(name, email, token);
  }

  private async sendForgotEmail(passwordReset: UserPasswordResetWithRelations): Promise<void> {
    const {
      expiresAt,
      token,
      user: { name, email },
    } = passwordReset;

    const expiresAtFormatted = format(expiresAt, 'dd/MM/yyyy HH:mm');

    await this.mailer.sendForgotPassword(name, email, token, expiresAtFormatted);
  }
}
