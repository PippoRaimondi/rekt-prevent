import joi from '@hapi/joi';

import { CreateUserDeviceValidator } from '../../domain/validators/CreateUserDeviceValidator';
import { BaseValidator } from './BaseValidator';

export class CreateUserDeviceJoiValidator extends BaseValidator
  implements CreateUserDeviceValidator {
  protected readonly schema: joi.ObjectSchema = joi
    .object({
      type: joi.string().required(),
      token: joi.string().max(500).required(),
      family: joi.valid('ios', 'android').required(),
    })
    .options({
      stripUnknown: true,
    });
}
