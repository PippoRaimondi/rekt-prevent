import joi from '@hapi/joi';

import { CreateUserValidator } from '../../../domain/validators/admin/CreateUserValidator';
import { BaseValidator } from '../BaseValidator';

export class CreateUserJoiValidator extends BaseValidator implements CreateUserValidator {
  private readonly peerSchema: joi.ObjectSchema = joi.object({
    id: joi.number().required(),
    isFavorite: joi.boolean().default(false),
  });

  protected readonly schema: joi.ObjectSchema = joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      phone: joi.string().optional(),
    })
    .options({
      stripUnknown: true,
    });
}
