import { RecaptchaV3 } from 'express-recaptcha/dist';

import { RecaptchaConfig } from '../../application/config/Config';

export class RecaptchaMiddleware extends RecaptchaV3 {
  constructor(config: RecaptchaConfig) {
    const { siteKey, secretKey } = config;

    super(siteKey, secretKey, { hl: 'pt-BR', callback: 'cb' });
  }
}
