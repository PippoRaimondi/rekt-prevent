import { NextFunction, Request, Response } from 'express';
import { CreateTokenUseCase } from 'src/application/usecases/CreateTokenUseCase';
import { ListTokenUseCase } from '../../application/usecases/ListTokenUseCase';
import { DeleteTokenUseCase } from '../../application/usecases/DeleteTokenUseCase';
import { ListTokenRequestMapper } from '../mappers/ListTokenRequestMapper';
import { CreateTokenRequestMapper } from '../mappers/CreateTokenRequestMapper';
import { GetTokenUseCase } from 'src/application/usecases/GetTokenUseCase';
import { UpdateTokenRequestMapper } from '../mappers/UpdateTokenRequestMapper';
import { UpdateTokenUseCase } from 'src/application/usecases/UpdateTokenUseCase';

export class TokenController {
  private readonly listUseCase: ListTokenUseCase;
  private readonly createUseCase: CreateTokenUseCase;
  private readonly deleteUseCase: DeleteTokenUseCase;
  private readonly getUseCase: GetTokenUseCase;
  private readonly updateUseCase: UpdateTokenUseCase;

  constructor(
    listUseCase: ListTokenUseCase,
    createUseCase: CreateTokenUseCase,
    deleteUseCase: DeleteTokenUseCase,
    getUseCase: GetTokenUseCase,
    updateUseCase: UpdateTokenUseCase,
  ) {
    this.listUseCase = listUseCase;
    this.createUseCase = createUseCase;
    this.deleteUseCase = deleteUseCase;
    this.getUseCase = getUseCase;
    this.updateUseCase = updateUseCase;

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
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

  async get(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const id = parseInt(request.params.id);
      const token = await this.getUseCase.invoke(id);

      return response.json(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on list tokens:`, error);

      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = CreateTokenRequestMapper.map(request);
      const token = await this.createUseCase.invoke(body);

      return response.json(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on list tokens:`, error);

      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const id = parseInt(request.params.id);
      const body = UpdateTokenRequestMapper.map(request);
      const token = await this.updateUseCase.invoke(id, body);

      return response.json(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on update tokens:`, error);

      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const id = parseInt(request.params.id);
      const token = await this.deleteUseCase.invoke(id);

      return response.json(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error on list tokens:`, error);

      next(error);
    }
  }
}