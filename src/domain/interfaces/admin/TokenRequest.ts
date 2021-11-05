import { Token } from '../../entities/Token';

export type TokenRequest = {
  description: string;
  chain: string;
  price: number;
};

export type CreateTokenRequest = TokenRequest;

export type UpdateTokenRequest = TokenRequest & {
  id: number;
};

export type ListTokenRequest = {
  page: number;
  filter: Partial<Token>;
};
