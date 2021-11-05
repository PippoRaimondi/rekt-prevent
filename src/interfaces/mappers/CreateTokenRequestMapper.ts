import { Request } from 'express';

import { Token } from '../../domain/entities/Token';
import { CreateTokenRequest } from '../../domain/interfaces/admin/TokenRequest';

export class CreateTokenRequestMapper {
  static map(request: Request): CreateTokenRequest {
    const { description, chain, price } = request.body;

    return {
      description,
      chain,
      price,
    };
  }
}
