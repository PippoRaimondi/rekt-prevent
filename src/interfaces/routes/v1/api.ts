import { Router } from 'express';

import {
  listTokenUseCase,
  authService,
  userService,
  userDeviceService,
  appRecaptchaMiddleware
 } from '../../../app';
import {
  TokenController,
} from '../../controllers';
import { AuthController, AccountController } from '../../controllers/v1';



// Controllers
export const tokenController = new TokenController(listTokenUseCase);
export const authController = new AuthController(authService, userService);
export const accountController = new AccountController(userService, userDeviceService);

// Routes
export const router = Router();

//auth
router.get('/auth/recaptcha', appRecaptchaMiddleware.middleware.render, authController.recaptcha);
router.post(
  '/auth/login',
  appRecaptchaMiddleware.middleware.verify,
  authController.loginWithRecaptcha
);
router.post('/auth/login/oauth', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/forgot-password/:token', authController.validateForgotPasswordToken);

//Account
router.put('/account', authController.authorize, accountController.update);
router.get('/account/:token/welcome', accountController.welcome);

// Tokens
router.post('/tokens', authController.authorize, tokenController.list);
