import { PaginationUtils } from '../../application/utils/PaginationUtils';
import { TokenMapper } from '../../domain/mappers/TokenMapper';
import { TokenListRequest } from '../interfaces/Token';
import { TokenRepository } from '../repositories/TokenRepository';
import { PaginationMapper } from '../../domain/mappers/PaginationMapper';
import {
  ListTokenResponse,
} from '../../domain/interfaces/responses/TokenResponse';
import { ListTokenRequest } from 'src/domain/interfaces/admin/TokenRequest';

export class ListTokenUseCase {
  private readonly TOKENS_PER_PAGE = 20;

  constructor(private readonly repository: TokenRepository) {}

  async invoke(request: ListTokenRequest): Promise<ListTokenResponse> {
    const { page, filter } = request;
    const offset = PaginationUtils.getOffsetByPage(page, this.TOKENS_PER_PAGE);

    const [tokens, count] = await this.repository.findAll(
      filter,
      this.TOKENS_PER_PAGE,
      offset
    );

    return {
      tokens: tokens.map((token) => TokenMapper.map(token)),
      pagination: PaginationMapper.map(page, count, this.TOKENS_PER_PAGE),
    };

  }
}
