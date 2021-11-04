import axios, { AxiosInstance } from 'axios';
import {
  portfolioRepository,
  tokenRepository,
  userRepository
} from './app';
import { Config } from './application/config/Config';
import { AuthService } from './application/services/AuthService';
import { parseConfigFromEnvironment } from './infrastructure/config/EnvironmentConfig';
import { Argon2HashService } from './infrastructure/services/Argon2HashService';
import { JWTTokenService } from './infrastructure/services/JWTTokenService';
import { UUIDService } from './infrastructure/services/UUIDService';
import { RecaptchaMiddleware } from './interfaces/middlewares/RecaptchaMiddleware';

// Config
export const config: Config = parseConfigFromEnvironment();
export const httpClient: AxiosInstance = axios.create();

// Middlewares
export const appRecaptchaMiddleware = new RecaptchaMiddleware(config.recaptcha.app);

// Validators

// Services
export const hashService = new Argon2HashService();
export const uniqueIdentifierService = new UUIDService();
export const userTokenService = new JWTTokenService(config.jwt.userSecret);
export const authService = new AuthService(userRepository, hashService, userTokenService);


