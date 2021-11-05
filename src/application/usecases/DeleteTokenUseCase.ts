import { TokenRepository } from '../repositories/TokenRepository';

export class DeleteTokenUseCase {


  private readonly repository: TokenRepository;

  constructor(
    repository: TokenRepository,
  ) {
    this.repository = repository;
  }

  async invoke(id: number): Promise<any> {
    const status = await this.repository.delete(id);

    return status;
  }
}
