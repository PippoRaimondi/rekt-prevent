import { NextFunction, Request, Response } from 'express';
import { stringify } from 'uuid';

import { ListTokenUseCase } from '../../application/usecases/ListTokenUseCase';
import { ListTokenRequestMapper } from '../mappers/ListTokenRequestMapper';

export class TokenController {
  private readonly listUseCase: ListTokenUseCase;

  constructor(
    listUseCase: ListTokenUseCase
  ) {
    this.listUseCase = listUseCase;

    this.list = this.list.bind(this);
  }

  async list(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = ListTokenRequestMapper.map(request);
      const tokens = await this.listUseCase.invoke(body);

      return response.json(tokens);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on list tokens:`, error);

      next(error);
    }
  }
}