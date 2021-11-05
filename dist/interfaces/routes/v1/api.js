"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.accountController = exports.authController = exports.tokenController = void 0;
const express_1 = require("express");
const app_1 = require("../../../app");
const controllers_1 = require("../../controllers");
const v1_1 = require("../../controllers/v1");
exports.tokenController = new controllers_1.TokenController(app_1.listTokenUseCase);
exports.authController = new v1_1.AuthController(app_1.authService, app_1.userService);
exports.accountController = new v1_1.AccountController(app_1.userService, app_1.userDeviceService);
exports.router = (0, express_1.Router)();
exports.router.get('/auth/recaptcha', app_1.appRecaptchaMiddleware.middleware.render, exports.authController.recaptcha);
exports.router.post('/auth/login', app_1.appRecaptchaMiddleware.middleware.verify, exports.authController.loginWithRecaptcha);
exports.router.post('/auth/login/oauth', exports.authController.login);
exports.router.post('/auth/forgot-password', exports.authController.forgotPassword);
exports.router.get('/auth/forgot-password/:token', exports.authController.validateForgotPasswordToken);
exports.router.put('/account', exports.authController.authorize, exports.accountController.update);
exports.router.get('/account/:token/welcome', exports.accountController.welcome);
exports.router.post('/tokens', exports.authController.authorize, exports.tokenController.list);
//# sourceMappingURL=api.js.map