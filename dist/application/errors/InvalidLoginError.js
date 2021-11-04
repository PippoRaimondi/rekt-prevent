"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLoginError = void 0;
const BaseError_1 = require("./BaseError");
class InvalidLoginError extends BaseError_1.BaseError {
    constructor() {
        super('Invalid email and/or password', 404);
    }
}
exports.InvalidLoginError = InvalidLoginError;
//# sourceMappingURL=InvalidLoginError.js.map