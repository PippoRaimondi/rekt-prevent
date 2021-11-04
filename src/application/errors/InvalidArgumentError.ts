import { BaseError } from './BaseError';

export class InvalidArgumentError extends BaseError {
  constructor(message = 'Invalid Argument') {
    super(message, 500);
  }
}
