import { User } from '../../domain/entities/User';
import { CreateTokenRequest } from '../../domain/interfaces/CreateTokenRequest';
import { TokenMapper } from '../../domain/mappers/TokenMapper';
import { TokenRepository } from '../repositories/TokenRepository';

export class CreateTokenUseCase {


  private readonly repository: TokenRepository;

  constructor(
    repository: TokenRepository,
  ) {
    this.repository = repository;
  }

  async invoke(request: CreateTokenRequest): Promise<any> {

    const { description, chain, price } = request;
    const token = await this.repository.create({
      description,
      chain,
      price,
    });

    return TokenMapper.toJSON(token);
  }
}
