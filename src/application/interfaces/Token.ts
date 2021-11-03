import { Token } from '../../domain/entities/Token';
import { Pagination } from '../../domain/interfaces/Pagination';

export type NewToken = Omit<Token, 'id'>;

export type TokenFilter = {
  name?: string;
};

export type TokenListRequest = {
  filter: TokenFilter;
  page: number;
};

export type TokenWithPagination = {
  entries: Token[];
  pagination: Pagination;
};
