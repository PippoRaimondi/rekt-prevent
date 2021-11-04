import { readFileSync } from 'fs';
import { resolve } from 'path';

import { MailRepository } from '../../application/repositories/MailRepository';

export class MailTemplateRepository implements MailRepository {
  private readonly TEMPLATE_DIRECTORY = resolve(__dirname, `../../interfaces/templates/mail`);

  get(name: string): string {
    const templateFile = readFileSync(`${this.TEMPLATE_DIRECTORY}/${name}.html`, 'utf8');

    return (
      templateFile
        // REMARKS Replacing some general values
        .replace(/\${copyrightYear}/g, new Date().getFullYear().toString())
    );
  }
}
