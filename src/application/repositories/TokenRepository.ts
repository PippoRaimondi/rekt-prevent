import { Token } from '../../domain/entities/Token';
import { TokenFilter, NewToken } from '../interfaces/Token';

export interface TokenRepository {
  create(holiday: NewToken): Promise<Token>;

  delete(holiday: Token): Promise<boolean>;

  findById(id: number): Promise<Token>;
  findAll(filter: TokenFilter, limit: number, offset: number): Promise<[Token[], number]>;
}
