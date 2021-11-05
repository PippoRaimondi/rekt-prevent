import { User } from '../../domain/entities/User';
import { CreateTokenRequest } from '../../domain/interfaces/CreateTokenRequest';
import { TokenMapper } from '../../domain/mappers/TokenMapper';
import { TokenRepository } from '../repositories/TokenRepository';

export class UpdateTokenUseCase {


  private readonly repository: TokenRepository;

  constructor(
    repository: TokenRepository,
  ) {
    this.repository = repository;
  }

  async invoke(id: number, request: CreateTokenRequest): Promise<any> {

    const { description, chain, price } = request;
    const status = await this.repository.update(id, {
      description,
      chain,
      price,
    });

    return status;
  }
}
