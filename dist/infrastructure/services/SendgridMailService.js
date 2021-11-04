"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendgridMailService = void 0;
const mail_1 = require("@sendgrid/mail");
class SendgridMailService {
    constructor(config) {
        this.config = config;
    }
    async send(message) {
        const mailer = new mail_1.MailService();
        mailer.setApiKey(this.config.mailer.apiKey);
        const { to, subject, body } = message;
        await mailer.send({
            to,
            from: this.config.mailer.fromAddress,
            subject,
            html: body,
        });
    }
}
exports.SendgridMailService = SendgridMailService;
//# sourceMappingURL=SendgridMailService.js.map