"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserJoiValidator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const BaseValidator_1 = require("../BaseValidator");
class CreateUserJoiValidator extends BaseValidator_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.peerSchema = joi_1.default.object({
            id: joi_1.default.number().required(),
            isFavorite: joi_1.default.boolean().default(false),
        });
        this.schema = joi_1.default
            .object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            phone: joi_1.default.string().optional(),
        })
            .options({
            stripUnknown: true,
        });
    }
}
exports.CreateUserJoiValidator = CreateUserJoiValidator;
//# sourceMappingURL=CreateUserJoiValidator.js.map