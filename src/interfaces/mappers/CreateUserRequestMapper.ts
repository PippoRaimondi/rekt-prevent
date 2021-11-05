import { Request } from 'express';

import { Admin } from '../../domain/entities/Admin';

import {
  CreateUserRequest,
} from '../../domain/interfaces/admin/UserRequest';

export class CreateUserRequestMapper {
  static map(request: Request): CreateUserRequest {
    const { name, email, phone, password } = request.body;

    return {
      name,
      email,
      password,
      phone,
      createdBy: request.user as Admin,
    };
  }

  static mapWithoutPortfolio(request: Request): CreateUserRequest {
    return this.map(request);
  }
  
}
