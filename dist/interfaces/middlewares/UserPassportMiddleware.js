"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassportMiddleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../../domain/entities/User");
const PassportMiddleware_1 = require("./PassportMiddleware");
class UserPassportMiddleware extends PassportMiddleware_1.PassportMiddleware {
    constructor(config, service, userService) {
        super(config, service);
        this.userService = userService;
    }
    async customValidation(entity) {
        return entity.status === User_1.UserStatus.ACTIVE;
    }
    getLocalStrategyOptions() {
        return {
            usernameField: 'email',
            passReqToCallback: true,
        };
    }
    getJWTStrategyOptions() {
        return {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.jwt.userSecret,
            passReqToCallback: true,
        };
    }
    async afterLogin(entity) {
        await this.userService.updateLastLoginAt(entity);
    }
}
exports.UserPassportMiddleware = UserPassportMiddleware;
//# sourceMappingURL=UserPassportMiddleware.js.map