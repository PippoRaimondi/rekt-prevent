"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argon2HashService = void 0;
const argon2_1 = require("argon2");
class Argon2HashService {
    hash(plain) {
        return (0, argon2_1.hash)(plain);
    }
    isEquals(plain, hashed) {
        return (0, argon2_1.verify)(hashed, plain);
    }
}
exports.Argon2HashService = Argon2HashService;
//# sourceMappingURL=Argon2HashService.js.map