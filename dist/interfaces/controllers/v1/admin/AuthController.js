"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
const ResetPasswordRequestMapper_1 = require("../../../mappers/ResetPasswordRequestMapper");
class AuthController {
    constructor(service) {
        this.service = service;
        this.get = this.get.bind(this);
        this.login = this.login.bind(this);
        this.recaptcha = this.recaptcha.bind(this);
        this.authorize = this.authorize.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.validateForgotPasswordToken = this.validateForgotPasswordToken.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }
    async authorize(request, response, next) {
        return await passport_1.default.authenticate('admin-jwt', { session: false }, (error, user, token) => {
            if (error || token instanceof Error) {
                console.log(token);
                return response.status(401).end();
            }
            return next();
        })(request, response, next);
    }
    async recaptcha(request, response, next) {
        return response.send(response.recaptcha).end();
    }
    async login(request, response, next) {
        return await passport_1.default.authenticate('admin-local', { session: false }, async (error, user) => {
            if (error || !user) {
                return response.status(404).end();
            }
            const adminWithToken = await this.service.generateToken(user);
            return response.json(adminWithToken);
        })(request, response, next);
    }
    async get(request, response, next) {
        try {
            const loggedUser = request.user;
            const admin = await this.service.get(loggedUser.id);
            return response.json(admin);
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(request, response, next) {
        try {
            const { email } = request.body;
            await this.service.forgotPassword(email);
            return response.status(200).end();
        }
        catch (error) {
            next(error);
        }
    }
    async validateForgotPasswordToken(request, response, next) {
        try {
            const { token } = request.params;
            const adminWithToken = await this.service.validateForgotPasswordToken(token);
            return response.json(adminWithToken);
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(request, response, next) {
        try {
            const body = ResetPasswordRequestMapper_1.ResetPasswordRequestMapper.map(request);
            const admin = await this.service.resetPassword(body);
            return response.status(200).json(admin);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map