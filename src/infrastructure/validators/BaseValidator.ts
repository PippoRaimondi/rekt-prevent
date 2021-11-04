import joi from '@hapi/joi';

import { ValidatorInterface } from '../../application/validators/ValidatorInterface';

export abstract class BaseValidator implements ValidatorInterface {
  protected abstract readonly schema: joi.AnySchema;

  getSchema(): joi.AnySchema {
    return this.schema;
  }

  validate(body: any): void {
    const validationResult = this.getSchema().validate(body);
    if (validationResult.error) {
      // TODO Create a ValidationException
      throw new Error(validationResult.error.message);
    }
  }
}
