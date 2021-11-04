"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidArgumentError = void 0;
const BaseError_1 = require("./BaseError");
class InvalidArgumentError extends BaseError_1.BaseError {
    constructor(message = 'Invalid Argument') {
        super(message, 500);
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
//# sourceMappingURL=InvalidArgumentError.js.map