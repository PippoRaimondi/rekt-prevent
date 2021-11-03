"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.tokenController = void 0;
const express_1 = require("express");
const app_1 = require("../../../app");
const controllers_1 = require("../../controllers");
exports.tokenController = new controllers_1.TokenController(app_1.listTokenUseCase);
exports.router = (0, express_1.Router)();
exports.router.post('/tokens', exports.tokenController.list);
//# sourceMappingURL=api.js.map