"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTTokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JWTTokenService {
    constructor(secret) {
        this.tokenOptions = {
            algorithm: 'HS256',
        };
        this.secret = secret;
    }
    generate(payload) {
        return (0, jsonwebtoken_1.sign)(payload, this.secret, this.tokenOptions);
    }
}
exports.JWTTokenService = JWTTokenService;
//# sourceMappingURL=JWTTokenService.js.map