"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./interfaces/routes");
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use((0, body_parser_1.json)());
server.use((0, body_parser_1.urlencoded)({ extended: false }));
server.use('/', routes_1.v1.apiRouter);
exports.default = server;
//# sourceMappingURL=server.js.map