"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordJoiValidator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const BaseValidator_1 = require("./BaseValidator");
class ResetPasswordJoiValidator extends BaseValidator_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.schema = joi_1.default.object({
            password: joi_1.default.string().required(),
            passwordConfirmation: joi_1.default.string().required().valid(joi_1.default.ref('password')),
            loggedUser: joi_1.default.object().required(),
        });
    }
}
exports.ResetPasswordJoiValidator = ResetPasswordJoiValidator;
//# sourceMappingURL=ResetPasswordJoiValidator.js.map