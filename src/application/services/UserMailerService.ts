import { Config } from '../../application/config/Config';
import { MailService } from '../../application/services/MailService';
import { MailRepository } from '../repositories/MailRepository';

export class UserMailerService {
  private readonly config: Config;
  private readonly service: MailService;
  private readonly repository: MailRepository;

  constructor(config: Config, service: MailService, repository: MailRepository) {
    this.config = config;
    this.service = service;
    this.repository = repository;
  }

  async sendWelcomeEmail(name: string, to: string, token: string): Promise<void> {
    const subject = `${name}, você agora faz parte do Monnio!`;

    // Rendering template
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

  async sendForgotPassword(
    name: string,
    to: string,
    token: string,
    expiresAt: string
  ): Promise<void> {
    const subject = `Redefina sua senha!`;

    // Rendering template
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
