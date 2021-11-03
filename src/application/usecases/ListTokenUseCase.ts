import { TokenMapper } from '../../domain/mappers/TokenMapper';
import { TokenFilter } from '../interfaces/Token';
import { TokenRepository } from '../repositories/TokenRepository';

export class ListTokenUseCase {
  constructor(private readonly repository: TokenRepository) {}

  async invoke(filter: TokenFilter, limit: number, offset: number): Promise<any> {
    const tokens = await this.repository.findAll(filter, limit, offset);

    return tokens;
  }
}
