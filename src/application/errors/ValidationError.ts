import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  constructor(message = 'Validation Error') {
    super(message, 400);
  }
}
