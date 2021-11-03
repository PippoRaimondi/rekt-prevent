import { NextFunction, Request, Response } from 'express';
import { stringify } from 'uuid';

import { ListTokenUseCase } from '../../application/usecases/ListTokenUseCase';

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
      const tokens = await this.listUseCase.invoke(request.body, 100, 0);

      return response.json(tokens);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on list tokens:`, error);

      next(error);
    }
  }
}