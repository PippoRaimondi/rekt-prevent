"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
class BaseValidator {
    getSchema() {
        return this.schema;
    }
    validate(body) {
        const validationResult = this.getSchema().validate(body);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    }
}
exports.BaseValidator = BaseValidator;
//# sourceMappingURL=BaseValidator.js.map