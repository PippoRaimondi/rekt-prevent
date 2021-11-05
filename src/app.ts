import 'reflect-metadata';

import axios, { AxiosInstance } from 'axios';

import { Config } from './application/config/Config';
import { MailRepository } from './application/repositories';

import { MailTemplateRepository } from './infrastructure/emails/MailTemplateRepository';

import { AuthService } from './application/services/AuthService';
import { AdminMailerService } from './application/services/AdminMailerService';
import { AdminService } from './application/services/AdminService';

import { parseConfigFromEnvironment } from './infrastructure/config/EnvironmentConfig';
import { RepositoryFactory } from './infrastructure/database/RepositoryFactory';

import { Argon2HashService } from './infrastructure/services/Argon2HashService';
import { JWTTokenService } from './infrastructure/services/JWTTokenService';
import { SendgridMailService } from './infrastructure/services/SendgridMailService';
import { UUIDService } from './infrastructure/services/UUIDService';


import { CreateTokenUseCase } from './application/usecases/CreateTokenUseCase';
import { ListTokenUseCase } from './application/usecases/ListTokenUseCase';
import { GetTokenUseCase } from './application/usecases/GetTokenUseCase';

import { AdminPassportMiddleware, UserPassportMiddleware } from './interfaces/middlewares';
import { RecaptchaMiddleware } from './interfaces/middlewares/RecaptchaMiddleware';

import { UserService } from './application/services/UserService';
import { UserDeviceService } from './application/services/UserDeviceService';
import { UserMailerService } from './application/services/UserMailerService';

import { ResetPasswordValidator } from './domain/validators/ResetPasswordValidator';
import { ResetPasswordJoiValidator } from './infrastructure/validators/ResetPasswordJoiValidator';

import { CreateUserValidator } from './domain/validators/admin/CreateUserValidator';
import { UpdateUserValidator } from './domain/validators/UpdateUserValidator';
import { CreateUserDeviceValidator } from './domain/validators/CreateUserDeviceValidator';
import { CreateUserJoiValidator } from './infrastructure/validators/admin/CreateUserJoiValidator';
import { UpdateUserJoiValidator } from './infrastructure/validators/UpdateUserJoiValidator';
import { CreateUserDeviceJoiValidator } from './infrastructure/validators/CreateUserDeviceJoiValidator';
import { DeleteTokenUseCase } from './application/usecases/DeleteTokenUseCase';
import { UpdateTokenUseCase } from './application/usecases/UpdateTokenUseCase';


// Config
export const config: Config = parseConfigFromEnvironment();
export const httpClient: AxiosInstance = axios.create();

// Repositories
const repositoryFactory = new RepositoryFactory(config);
export const {
  db: {
    portfolio: portfolioRepository,
    token: tokenRepository,
    admin: adminRepository,
    user: userRepository,
    adminPasswordReset: adminPasswordResetRepository,
    userAggregator: userAggregatorRepository,
    userVerification: userVerificationRepository,
    userPasswordReset: userPasswordResetRepository,
    userDevice: userDeviceRepository,
  },
} = repositoryFactory.create();

export const mailRepository: MailRepository = new MailTemplateRepository();

//Services
export const hashService = new Argon2HashService();
export const mailService = new SendgridMailService(config);
export const uniqueIdentifierService = new UUIDService();
export const userTokenService = new JWTTokenService(config.jwt.userSecret);
export const adminTokenService = new JWTTokenService(config.jwt.adminSecret);
export const adminAuthService = new AuthService(adminRepository, hashService, adminTokenService);
export const authService = new AuthService(userRepository, hashService, userTokenService);
export const adminMailerService = new AdminMailerService(config, mailService, mailRepository);
export const userMailService = new UserMailerService(config, mailService, mailRepository);

//Validators
export const resetPasswordValidator: ResetPasswordValidator = new ResetPasswordJoiValidator();
export const createUserValidator: CreateUserValidator = new CreateUserJoiValidator();
export const updateUserValidator: UpdateUserValidator = new UpdateUserJoiValidator();
export const createUserDeviceValidator: CreateUserDeviceValidator = new CreateUserDeviceJoiValidator();

// Usecases
export const createTokenUseCase = new CreateTokenUseCase(
  tokenRepository
);
export const deletePortfolioUseCase = new ListTokenUseCase(
  tokenRepository
);
export const deleteTokenUseCase = new DeleteTokenUseCase(tokenRepository);
export const updateTokenUseCase = new UpdateTokenUseCase(tokenRepository);
export const getTokenUseCase = new GetTokenUseCase(tokenRepository);
export const listTokenUseCase = new ListTokenUseCase(tokenRepository);

// Services
export const adminService = new AdminService(
  resetPasswordValidator,
  adminRepository,
  adminPasswordResetRepository,
  adminAuthService,
  adminMailerService,
  uniqueIdentifierService
);


export const userService = new UserService(
  createUserValidator,
  resetPasswordValidator,
  updateUserValidator,
  userRepository,
  userAggregatorRepository,
  userVerificationRepository,
  userPasswordResetRepository,
  authService,
  userMailService,
  uniqueIdentifierService
);

export const userDeviceService = new UserDeviceService(
  createUserDeviceValidator,
  userDeviceRepository
);



// Middlewares
export const adminPassportMiddleware = new AdminPassportMiddleware(config, adminAuthService);
export const userPassportMiddleware = new UserPassportMiddleware(config, authService, userService);

export const adminRecaptchaMiddleware = new RecaptchaMiddleware(config.recaptcha.admin);
export const appRecaptchaMiddleware = new RecaptchaMiddleware(config.recaptcha.app);
export const organizationRecaptchaMiddleware = new RecaptchaMiddleware(
  config.recaptcha.organization
);