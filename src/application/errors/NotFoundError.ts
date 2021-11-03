import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor() {
    super('Not found', 404);
  }
}
