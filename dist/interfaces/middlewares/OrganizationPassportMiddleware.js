"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationPassportMiddleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../../domain/entities/User");
const PassportMiddleware_1 = require("./PassportMiddleware");
class OrganizationPassportMiddleware extends PassportMiddleware_1.PassportMiddleware {
    constructor(config, authService) {
        super(config, authService);
    }
    async customValidation(entity) {
        if (entity.status !== User_1.UserStatus.ACTIVE) {
            return false;
        }
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
        return;
    }
}
exports.OrganizationPassportMiddleware = OrganizationPassportMiddleware;
//# sourceMappingURL=OrganizationPassportMiddleware.js.map