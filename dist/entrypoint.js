"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokenService = exports.uniqueIdentifierService = exports.hashService = exports.appRecaptchaMiddleware = exports.httpClient = exports.config = void 0;
const axios_1 = __importDefault(require("axios"));
const EnvironmentConfig_1 = require("./infrastructure/config/EnvironmentConfig");
const Argon2HashService_1 = require("./infrastructure/services/Argon2HashService");
const JWTTokenService_1 = require("./infrastructure/services/JWTTokenService");
const UUIDService_1 = require("./infrastructure/services/UUIDService");
const RecaptchaMiddleware_1 = require("./interfaces/middlewares/RecaptchaMiddleware");
exports.config = (0, EnvironmentConfig_1.parseConfigFromEnvironment)();
exports.httpClient = axios_1.default.create();
exports.appRecaptchaMiddleware = new RecaptchaMiddleware_1.RecaptchaMiddleware(exports.config.recaptcha.app);
exports.hashService = new Argon2HashService_1.Argon2HashService();
exports.uniqueIdentifierService = new UUIDService_1.UUIDService();
exports.userTokenService = new JWTTokenService_1.JWTTokenService(exports.config.jwt.userSecret);
//# sourceMappingURL=entrypoint.js.map