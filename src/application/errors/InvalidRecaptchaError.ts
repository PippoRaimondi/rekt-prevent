import { BaseError } from './BaseError';

export class InvalidRecaptchaError extends BaseError {
  constructor(message = 'Invalid Recaptcha Error') {
    super(message, 400);
  }
}
