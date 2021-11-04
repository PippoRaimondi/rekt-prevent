import { Config } from '../config/Config';
import { MailRepository } from '../repositories/MailRepository';
import { MailService } from './MailService';

export class AdminMailerService {
  private readonly config: Config;
  private readonly service: MailService;
  private readonly repository: MailRepository;

  constructor(config: Config, service: MailService, repository: MailRepository) {
    this.config = config;
    this.service = service;
    this.repository = repository;
  }

  async forgotPassword(name: string, to: string, token: string, expiresAt: string): Promise<void> {
    const subject = `Redefina sua senha!`;

    // Rendering template
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
