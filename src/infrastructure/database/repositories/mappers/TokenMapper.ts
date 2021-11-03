import { NewToken } from '../../../../application/interfaces/Token';
import { Token } from '../../../../domain/entities/Token';

export class TokenMapper {
  static mapFromDatabase(record: any, prefix = ''): Token {
    return {
      id: +record[`${prefix}id`],
      description: record[`${prefix}token_desc`],
      chain: record[`${prefix}chain`],
      price: record[`${prefix}initial_price`],
    };
  }

  static mapToDatabase(entity: Token | NewToken): any {
    return {
      ...entity
    };
  }
}
