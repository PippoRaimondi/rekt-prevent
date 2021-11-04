import { Request } from 'express';

import { Admin } from '../../domain/entities/Admin';
import { User } from '../../domain/entities/User';
import { ResetPasswordRequest } from '../../domain/interfaces/ResetPasswordRequest';

export class ResetPasswordRequestMapper {
  static map(request: Request): ResetPasswordRequest {
    const { password, passwordConfirmation } = request.body;

    return {
      password,
      passwordConfirmation,
      loggedUser: request.user as User | Admin,
    };
  }
}
