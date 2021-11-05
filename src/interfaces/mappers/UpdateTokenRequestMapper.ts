import { Request } from 'express';

import { CreateTokenRequest } from '../../domain/interfaces/admin/TokenRequest';

export class UpdateTokenRequestMapper {
  static map(request: Request): CreateTokenRequest {
    const { description, chain, price } = request.body;

    return {
      description,
      chain,
      price,
    };
  }
}
