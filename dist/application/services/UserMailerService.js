"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMailerService = void 0;
class UserMailerService {
    constructor(config, service, repository) {
        this.config = config;
        this.service = service;
        this.repository = repository;
    }
    async sendWelcomeEmail(name, to, token) {
        const subject = `${name}, você agora faz parte do Monnio!`;
        const body = this.repository
            .get('welcome-user')
            .replace(/\${subject}/g, subject)
            .replace(/\${name}/g, name)
            .replace(/\${link}/g, `${this.config.appUrl}/account/${token}/welcome`);
        await this.service.send({
            to,
            subject,
            body,
        });
    }
    async sendForgotPassword(name, to, token, expiresAt) {
        const subject = `Redefina sua senha!`;
        const body = this.repository
            .get('forgot-password')
            .replace(/\${subject}/g, subject)
            .replace(/\${name}/g, name)
            .replace(/\${link}/g, `${this.config.appUrl}/auth/forgot-password/${token}`)
            .replace(/\${expiresAt}/g, expiresAt);
        await this.service.send({
            to,
            subject,
            body,
        });
    }
}
exports.UserMailerService = UserMailerService;
//# sourceMappingURL=UserMailerService.js.map