import { NewPortfolio } from '../../../../application/interfaces/Portfolio';
import { Portfolio } from '../../../../domain/entities/Portfolio';

export class PortfolioMapper {
  static mapFromDatabase(record: any, prefix = ''): Portfolio {
    return {
      id: +record[`${prefix}id`],
      name: record[`${prefix}name`],
      user_id: record[`${prefix}user_id`],
    };
  }

  static mapToDatabase(entity: Portfolio | NewPortfolio): any {
    return {
      ...entity
    };
  }
}
