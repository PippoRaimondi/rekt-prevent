"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRecaptchaError = void 0;
const BaseError_1 = require("./BaseError");
class InvalidRecaptchaError extends BaseError_1.BaseError {
    constructor(message = 'Invalid Recaptcha Error') {
        super(message, 400);
    }
}
exports.InvalidRecaptchaError = InvalidRecaptchaError;
//# sourceMappingURL=InvalidRecaptchaError.js.map