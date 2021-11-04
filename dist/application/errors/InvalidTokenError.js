"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const BaseError_1 = require("./BaseError");
class InvalidTokenError extends BaseError_1.BaseError {
    constructor(message = 'Invalid Token') {
        super(message, 404);
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=InvalidTokenError.js.map