import { Request } from 'express';

import {
  CreateAdminRequest,
} from '../../domain/interfaces/admin/AdminRequest';

export class CreateAdminRequestMapper {
  static map(request: Request): CreateAdminRequest {
    const { name, email, password } = request.body;

    return {
      name,
      email,
      password
    };
  }

  static mapWithoutPortfolio(request: Request): CreateAdminRequest {
    return this.map(request);
  }
  
}
