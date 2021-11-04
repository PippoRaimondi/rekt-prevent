"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportMiddleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const InvalidLoginError_1 = require("../../application/errors/InvalidLoginError");
class PassportMiddleware {
    constructor(config, service) {
        this.config = config;
        this.service = service;
    }
    async isValidUser(entity, password) {
        if (!entity) {
            return false;
        }
        const isValid = await this.customValidation(entity);
        if (!isValid) {
            return false;
        }
        const samePassword = await this.service.comparePassword(password, entity.password);
        if (!samePassword) {
            return false;
        }
        return true;
    }
    getLocalStrategy() {
        return new passport_local_1.Strategy(this.getLocalStrategyOptions(), async (request, email, password, done) => {
            try {
                const entity = await this.service.findByLogin(email);
                const isValidUser = await this.isValidUser(entity, password);
                if (!isValidUser) {
                    throw new InvalidLoginError_1.InvalidLoginError();
                }
                request.user = entity;
                await this.afterLogin(entity);
                return done(null, entity);
            }
            catch (error) {
                return done(error, undefined, { message: 'Invalid email and/or password' });
            }
        });
    }
    getJWTStrategy() {
        return new passport_jwt_1.Strategy(this.getJWTStrategyOptions(), async (request, payload, done) => {
            try {
                const entity = await this.service.findByLogin(payload.email);
                request.user = entity;
                await this.afterLogin(entity);
                return done(null, entity);
            }
            catch (error) {
                return done(error, null);
            }
        });
    }
}
exports.PassportMiddleware = PassportMiddleware;
//# sourceMappingURL=PassportMiddleware.js.map