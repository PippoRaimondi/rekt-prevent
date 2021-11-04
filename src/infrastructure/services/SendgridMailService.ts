import { MailService as sgMail } from '@sendgrid/mail';

import { Config } from '../../application/config/Config';
import { MailMessage, MailService } from '../../application/services/MailService';

export class SendgridMailService implements MailService {
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async send(message: MailMessage): Promise<void> {
    const mailer = new sgMail();
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
