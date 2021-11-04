import { Request } from 'express';

import {
  Filter,
  ListUserRequest,
  OrderBy,
  SortBy,
} from '../../domain/interfaces/admin/ListUserRequest';

export class ListUserRequestMapper {
  static map(request: Request): ListUserRequest {
    const page = Number(request.query?.page) || 1;
    const orderBy: OrderBy = this.mapOrderBy(request.query);
    const filter: Filter = this.mapFilter(request.query);

    return {
      page,
      filter,
      orderBy,
    };
  }

  private static mapOrderBy(query: any): OrderBy {
    const { orderBy } = query;

    let sort: SortBy;
    switch (orderBy?.sort) {
      case 'NAME': {
        sort = SortBy.NAME;
        break;
      }
      case 'CREATED_AT':
      default: {
        sort = SortBy.CREATED_AT;
        break;
      }
    }

    return {
      sort,
      direction: orderBy?.direction?.toUpperCase() || 'ASC',
    };
  }

  private static mapFilter(query: any): Filter {
    const { name, email } = query;

    return {
      name,
      email,
    };
  }
}
