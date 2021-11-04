import { Router } from 'express';

import {
  adminRecaptchaMiddleware,
  adminService,
  userService,
} from '../../../app';
import { AuthController, UserController } from '../../controllers/v1/admin';

// Controllers
export const authController = new AuthController(adminService);

export const userController = new UserController(
  userService
);
/**
 * Routes
 */
export const router = Router();

// /auth
router.get('/auth', authController.authorize, authController.get);
router.get('/auth/recaptcha', adminRecaptchaMiddleware.middleware.render, authController.recaptcha);
router.post('/auth/login', adminRecaptchaMiddleware.middleware.verify, authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/forgot-password/:token', authController.validateForgotPasswordToken);
router.post('/auth/reset-password', authController.authorize, authController.resetPassword);

// /users
router.get('/users', authController.authorize, userController.list);
router.get('/users/:id', userController.get);
router.delete('/users/:id', authController.authorize, userController.delete);
router.post('/users/:id/resend-invite', authController.authorize, userController.resendInvite);

router.post('/users', authController.authorize, userController.create);
