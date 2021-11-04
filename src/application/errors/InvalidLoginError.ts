import { BaseError } from './BaseError';

export class InvalidLoginError extends BaseError {
  constructor() {
    super('Invalid email and/or password', 404);
  }
}
