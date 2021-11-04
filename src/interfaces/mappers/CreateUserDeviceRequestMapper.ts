import { Request } from 'express';

import { User } from '../../domain/entities/User';
import { CreateUserDeviceRequest } from '../../domain/interfaces/requests/CreateUserDeviceRequest';

export class CreateUserDeviceRequestMapper {
  static map(request: Request): CreateUserDeviceRequest {
    const { type, token, family } = request.body;

    return {
      type,
      token,
      family,
      user: request.user as User,
    };
  }
}
