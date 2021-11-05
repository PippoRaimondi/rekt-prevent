import { Pagination } from '../Pagination';

export type TokenResponse = {
  id: number;
  description: string;
  chain: string;
  price: number;
};

export type ListTokenResponse = {
  tokens: TokenResponse[];
  pagination: Pagination;
};

