"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.userController = exports.authController = void 0;
const express_1 = require("express");
const app_1 = require("../../../app");
const admin_1 = require("../../controllers/v1/admin");
exports.authController = new admin_1.AuthController(app_1.adminService);
exports.userController = new admin_1.UserController(app_1.userService);
exports.router = (0, express_1.Router)();
exports.router.get('/auth', exports.authController.authorize, exports.authController.get);
exports.router.get('/auth/recaptcha', app_1.adminRecaptchaMiddleware.middleware.render, exports.authController.recaptcha);
exports.router.post('/auth/login', app_1.adminRecaptchaMiddleware.middleware.verify, exports.authController.login);
exports.router.post('/auth/forgot-password', exports.authController.forgotPassword);
exports.router.get('/auth/forgot-password/:token', exports.authController.validateForgotPasswordToken);
exports.router.post('/auth/reset-password', exports.authController.authorize, exports.authController.resetPassword);
exports.router.get('/users', exports.authController.authorize, exports.userController.list);
exports.router.get('/users/:id', exports.userController.get);
exports.router.delete('/users/:id', exports.authController.authorize, exports.userController.delete);
exports.router.post('/users/:id/resend-invite', exports.authController.authorize, exports.userController.resendInvite);
exports.router.post('/users', exports.authController.authorize, exports.userController.create);
//# sourceMappingURL=admin.js.map