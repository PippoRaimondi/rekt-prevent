"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTokenUseCase = exports.getTokenUseCase = exports.deletePortfolioUseCase = exports.createTokenUseCase = exports.userTokenService = exports.uniqueIdentifierService = exports.hashService = exports.tokenRepository = exports.portfolioRepository = exports.httpClient = exports.config = void 0;
require("reflect-metadata");
const axios_1 = __importDefault(require("axios"));
const EnvironmentConfig_1 = require("./infrastructure/config/EnvironmentConfig");
const RepositoryFactory_1 = require("./infrastructure/database/RepositoryFactory");
const Argon2HashService_1 = require("./infrastructure/services/Argon2HashService");
const JWTTokenService_1 = require("./infrastructure/services/JWTTokenService");
const UUIDService_1 = require("./infrastructure/services/UUIDService");
const CreateTokenUseCase_1 = require("./application/usecases/CreateTokenUseCase");
const ListTokenUseCase_1 = require("./application/usecases/ListTokenUseCase");
const GetTokenUseCase_1 = require("./application/usecases/GetTokenUseCase");
exports.config = (0, EnvironmentConfig_1.parseConfigFromEnvironment)();
exports.httpClient = axios_1.default.create();
const repositoryFactory = new RepositoryFactory_1.RepositoryFactory(exports.config);
_a = repositoryFactory.create().db, exports.portfolioRepository = _a.portfolio, exports.tokenRepository = _a.token;
exports.hashService = new Argon2HashService_1.Argon2HashService();
exports.uniqueIdentifierService = new UUIDService_1.UUIDService();
exports.userTokenService = new JWTTokenService_1.JWTTokenService(exports.config.jwt.userSecret);
exports.createTokenUseCase = new CreateTokenUseCase_1.CreateTokenUseCase(exports.tokenRepository);
exports.deletePortfolioUseCase = new ListTokenUseCase_1.ListTokenUseCase(exports.tokenRepository);
exports.getTokenUseCase = new GetTokenUseCase_1.GetTokenUseCase(exports.tokenRepository);
exports.listTokenUseCase = new ListTokenUseCase_1.ListTokenUseCase(exports.tokenRepository);
//# sourceMappingURL=app.js.map