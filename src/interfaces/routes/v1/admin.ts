import { Router } from 'express';

import {
  adminRecaptchaMiddleware,
  adminService,
  userService,
  listTokenUseCase,
  createTokenUseCase,
  deleteTokenUseCase,
  getTokenUseCase,
  updateTokenUseCase,
} from '../../../app';
import { AuthController, UserController, AdminController } from '../../controllers/v1/admin';
import { TokenController } from '../../controllers';

// Controllers
export const authController = new AuthController(adminService);

export const userController = new UserController(
  userService
);

export const adminController = new AdminController(
  adminService
);

export const tokenController = new TokenController(listTokenUseCase, createTokenUseCase, deleteTokenUseCase, getTokenUseCase, updateTokenUseCase);
/**
 * Routes
 */
export const router = Router();

// /auth
router.get('/auth', authController.authorize, authController.get);
router.get('/auth/recaptcha', adminRecaptchaMiddleware.middleware.render, authController.recaptcha);
//router.post('/auth/login', adminRecaptchaMiddleware.middleware.verify, authController.login);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/forgot-password/:token', authController.validateForgotPasswordToken);
router.post('/auth/reset-password', authController.authorize, authController.resetPassword);

// /users
router.get('/users', authController.authorize, userController.list);
router.post('/users', authController.authorize, userController.create);
router.get('/users/:id', userController.get);
router.delete('/users/:id', authController.authorize, userController.delete);
router.post('/users/:id/resend-invite', authController.authorize, userController.resendInvite);

//Tokens
router.get('/tokens', authController.authorize, tokenController.list);
router.post('/tokens', authController.authorize, tokenController.create);
router.post('/token/:id', authController.authorize, tokenController.update);
router.delete('/token/:id', authController.authorize, tokenController.delete);
router.get('/token/:id', authController.authorize, tokenController.get);

// /admins
router.get('/admins', authController.authorize, adminController.list);
router.post('/admin', authController.authorize, adminController.create);