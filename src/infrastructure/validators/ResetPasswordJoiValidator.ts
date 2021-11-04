import joi from '@hapi/joi';

import { ResetPasswordValidator } from '../../domain/validators/ResetPasswordValidator';
import { BaseValidator } from './BaseValidator';

export class ResetPasswordJoiValidator extends BaseValidator implements ResetPasswordValidator {
  protected readonly schema: joi.ObjectSchema = joi.object({
    password: joi.string().required(),
    passwordConfirmation: joi.string().required().valid(joi.ref('password')),
    loggedUser: joi.object().required(),
  });
}
