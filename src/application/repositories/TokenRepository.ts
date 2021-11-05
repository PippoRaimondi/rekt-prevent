import { Token } from '../../domain/entities/Token';
import { TokenFilter, NewToken } from '../interfaces/Token';

export interface TokenRepository {
  create(token: NewToken): Promise<Token>;
  update(id: number, token: NewToken): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  findById(id: number): Promise<Token>;
  findAll(filter: Partial<Token>, limit: number, offset: number): Promise<[Token[], number]>;
}
