"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPassportMiddleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const PassportMiddleware_1 = require("./PassportMiddleware");
class AdminPassportMiddleware extends PassportMiddleware_1.PassportMiddleware {
    constructor(config, service) {
        super(config, service);
    }
    async customValidation(entity) {
        return true;
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
            secretOrKey: this.config.jwt.adminSecret,
            passReqToCallback: true,
        };
    }
    async afterLogin(entity) {
        return;
    }
}
exports.AdminPassportMiddleware = AdminPassportMiddleware;
//# sourceMappingURL=AdminPassportMiddleware.js.map