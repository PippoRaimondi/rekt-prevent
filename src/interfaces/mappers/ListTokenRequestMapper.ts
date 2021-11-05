import { Request } from 'express';

import { Token } from '../../domain/entities/Token';
import { ListTokenRequest } from '../../domain/interfaces/admin/TokenRequest';

export class ListTokenRequestMapper {
  static map(request: Request): ListTokenRequest {
    const page = Number(request.query?.page) || 1;
    const filter: Partial<Token> = this.mapFilter(request.query);

    return {
      page,
      filter,
    };
  }

  private static mapFilter(query: any): Partial<Token> {
    const { description, chain } = query;

    return {
      description,
      chain
    };
  }
}
