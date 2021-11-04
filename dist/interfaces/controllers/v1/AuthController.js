"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.login = this.login.bind(this);
        this.authorize = this.authorize.bind(this);
        this.recaptcha = this.recaptcha.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.loginWithRecaptcha = this.loginWithRecaptcha.bind(this);
        this.validateForgotPasswordToken = this.validateForgotPasswordToken.bind(this);
    }
    async recaptcha(request, response, next) {
        return response.send(response.recaptcha).end();
    }
    async loginWithRecaptcha(request, response, next) {
        var _a, _b;
        if ((_a = request.recaptcha) === null || _a === void 0 ? void 0 : _a.error) {
            return response.status(404).send({ error: (_b = request.recaptcha) === null || _b === void 0 ? void 0 : _b.error });
        }
        return this.login(request, response, next);
    }
    async login(request, response, next) {
        var _a, _b;
        if ((_a = request.recaptcha) === null || _a === void 0 ? void 0 : _a.error) {
            return response.status(404).send({ error: (_b = request.recaptcha) === null || _b === void 0 ? void 0 : _b.error });
        }
        return await passport_1.default.authenticate('user-local', { session: false }, async (error, user) => {
            if (error || !user) {
                return response.status(404).end();
            }
            const token = this.authService.generateToken(user);
            const userWithPortfolio = await this.userService.get(user.id);
            return response.json({
                token,
                user: userWithPortfolio,
            });
        })(request, response, next);
    }
    async forgotPassword(request, response, next) {
        try {
            const { email } = request.body;
            await this.userService.forgotPassword(email);
            return response.status(200).end();
        }
        catch (error) {
            next(error);
        }
    }
    async validateForgotPasswordToken(request, response, next) {
        try {
            const { token } = request.params;
            const adminWithToken = await this.userService.validateForgotPasswordToken(token);
            return response.json(adminWithToken);
        }
        catch (error) {
            next(error);
        }
    }
    async authorize(request, response, next) {
        return await passport_1.default.authenticate('user-jwt', { session: false }, (error, user, token) => {
            if (error || token instanceof Error) {
                return response.status(401).end();
            }
            return next();
        })(request, response, next);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map