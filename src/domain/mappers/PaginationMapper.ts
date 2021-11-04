import { Pagination } from '../interfaces/Pagination';

export class PaginationMapper {
  /**
   * @deprecated
   */
  static toJSON(currentPage: number, totalItems: number, itemsPerPage: number): Pagination {
    return this.map(currentPage, totalItems, itemsPerPage);
  }

  static map(currentPage: number, totalItems: number, itemsPerPage: number): Pagination {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      itemsPerPage,
      currentPage,
      totalPages,
    };
  }
}
