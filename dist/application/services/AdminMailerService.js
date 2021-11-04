"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMailerService = void 0;
class AdminMailerService {
    constructor(config, service, repository) {
        this.config = config;
        this.service = service;
        this.repository = repository;
    }
    async forgotPassword(name, to, token, expiresAt) {
        const subject = `Redefina sua senha!`;
        const body = this.repository
            .get('forgot-password')
            .replace(/\${subject}/g, subject)
            .replace(/\${name}/g, name)
            .replace(/\${link}/g, `${this.config.adminUrl}/auth/${token}/reset-password`)
            .replace(/\${expiresAt}/g, expiresAt);
        await this.service.send({
            to,
            subject,
            body,
        });
    }
}
exports.AdminMailerService = AdminMailerService;
//# sourceMappingURL=AdminMailerService.js.map