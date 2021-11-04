"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaMiddleware = void 0;
const dist_1 = require("express-recaptcha/dist");
class RecaptchaMiddleware extends dist_1.RecaptchaV3 {
    constructor(config) {
        const { siteKey, secretKey } = config;
        super(siteKey, secretKey, { hl: 'pt-BR', callback: 'cb' });
    }
}
exports.RecaptchaMiddleware = RecaptchaMiddleware;
//# sourceMappingURL=RecaptchaMiddleware.js.map