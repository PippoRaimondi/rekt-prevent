"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDeviceJoiValidator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const BaseValidator_1 = require("./BaseValidator");
class CreateUserDeviceJoiValidator extends BaseValidator_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.schema = joi_1.default
            .object({
            type: joi_1.default.string().required(),
            token: joi_1.default.string().max(500).required(),
            family: joi_1.default.valid('ios', 'android').required(),
        })
            .options({
            stripUnknown: true,
        });
    }
}
exports.CreateUserDeviceJoiValidator = CreateUserDeviceJoiValidator;
//# sourceMappingURL=CreateUserDeviceJoiValidator.js.map