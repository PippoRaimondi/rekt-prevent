import { User } from '../../domain/entities/User';
import { TokenMapper } from '../../domain/mappers/TokenMapper';
import { TokenRepository } from '../repositories';

export class GetTokenUseCase {
  constructor(private readonly repository: TokenRepository
    ) {}

  async invoke(id: number): Promise<any> {
    const token = await this.repository.findById(id);

    return TokenMapper.toJSON(token);
  }
}
