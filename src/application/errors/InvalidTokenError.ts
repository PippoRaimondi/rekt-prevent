import { BaseError } from './BaseError';

export class InvalidTokenError extends BaseError {
  constructor(message = 'Invalid Token') {
    super(message, 404);
  }
}
