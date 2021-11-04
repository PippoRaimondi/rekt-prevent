"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const app_1 = require("./app");
const routes_1 = require("./interfaces/routes");
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use((0, body_parser_1.json)());
server.use((0, body_parser_1.urlencoded)({ extended: false }));
passport_1.default.use('admin-local', app_1.adminPassportMiddleware.getLocalStrategy());
passport_1.default.use('admin-jwt', app_1.adminPassportMiddleware.getJWTStrategy());
passport_1.default.use('user-local', app_1.userPassportMiddleware.getLocalStrategy());
passport_1.default.use('user-jwt', app_1.userPassportMiddleware.getJWTStrategy());
server.use('/', routes_1.v1.apiRouter);
server.use('/admin', routes_1.v1.adminRouter);
exports.default = server;
//# sourceMappingURL=server.js.map