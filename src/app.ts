import 'reflect-metadata';

import axios, { AxiosInstance } from 'axios';

import { Config } from './application/config/Config';
import { AuthService } from './application/services/AuthService';

import { parseConfigFromEnvironment } from './infrastructure/config/EnvironmentConfig';
import { RepositoryFactory } from './infrastructure/database/RepositoryFactory';

import { Argon2HashService } from './infrastructure/services/Argon2HashService';
import { JWTTokenService } from './infrastructure/services/JWTTokenService';
import { UUIDService } from './infrastructure/services/UUIDService';

import { CreateTokenUseCase } from './application/usecases/CreateTokenUseCase';
import { ListTokenUseCase } from './application/usecases/ListTokenUseCase';
import { GetTokenUseCase } from './application/usecases/GetTokenUseCase';



// Config
export const config: Config = parseConfigFromEnvironment();
export const httpClient: AxiosInstance = axios.create();

// Repositories
const repositoryFactory = new RepositoryFactory(config);
export const {
  db: {
    portfolio: portfolioRepository,
    token: tokenRepository,
    //user: userRepository,
  },
} = repositoryFactory.create();

// Services
export const hashService = new Argon2HashService();
export const uniqueIdentifierService = new UUIDService();
export const userTokenService = new JWTTokenService(config.jwt.userSecret);
//export const authService = new AuthService(userRepository, hashService, userTokenService);

// Usecases
export const createTokenUseCase = new CreateTokenUseCase(
  tokenRepository
);
export const deletePortfolioUseCase = new ListTokenUseCase(
  tokenRepository
);
export const getTokenUseCase = new GetTokenUseCase(tokenRepository);
export const listTokenUseCase = new ListTokenUseCase(tokenRepository);

// // Middlewares
// export const adminPassportMiddleware = new AdminPassportMiddleware(config, adminAuthService);
// export const organizationPassportMiddleware = new OrganizationPassportMiddleware(
//   config,
//   organizationAuthService,
//   organizationService
// );
// export const userPassportMiddleware = new UserPassportMiddleware(config, authService, userService);

// export const adminRecaptchaMiddleware = new RecaptchaMiddleware(config.recaptcha.admin);
// export const appRecaptchaMiddleware = new RecaptchaMiddleware(config.recaptcha.app);
// export const organizationRecaptchaMiddleware = new RecaptchaMiddleware(
//   config.recaptcha.organization
// );
