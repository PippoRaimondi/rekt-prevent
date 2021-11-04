import { Request } from 'express';

import { User } from '../../domain/entities/User';
import { UpdateUserRequest } from '../../domain/interfaces/UpdateUserRequest';

export class UpdateUserRequestMapper {
  static map(request: Request): UpdateUserRequest {
    const { name, phone, currentPassword, newPassword, newPasswordConfirmation } = request.body;

    return {
      name,
      phone,
      currentPassword,
      newPassword,
      newPasswordConfirmation,
      loggedUser: request.user as User,
    };
  }
}
