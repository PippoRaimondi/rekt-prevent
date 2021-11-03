import { Portfolio } from '../../domain/entities/Portfolio';
import { Pagination } from '../../domain/interfaces/Pagination';

export type NewPortfolio = Omit<Portfolio, 'id'>;

export type PortfolioFilter = {
  name?: string;
};

export type PortfolioListRequest = {
  filter: PortfolioFilter;
  page: number;
};

export type PorttfolioWithPagination = {
  entries: Portfolio[];
  pagination: Pagination;
};
