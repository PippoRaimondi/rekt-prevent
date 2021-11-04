import { InvalidArgumentError } from '../errors/InvalidArgumentError';

export class PaginationUtils {
  static getOffsetByPage(page: number, itemsPerPage: number): number {
    if (page < 1 || !Number.isInteger(page)) {
      throw new InvalidArgumentError('page should be positive and an integer');
    }

    if (itemsPerPage < 1 || !Number.isInteger(itemsPerPage)) {
      throw new InvalidArgumentError('itemsPerPage  should be positive and an integer');
    }

    return (page - 1) * itemsPerPage;
  }
}
