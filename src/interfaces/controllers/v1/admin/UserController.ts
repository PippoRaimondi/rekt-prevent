import { NextFunction, Request, Response } from 'express';

import { UserService } from '../../../../application/services/UserService';
import { CreateUserRequestMapper } from '../../../mappers/CreateUserRequestMapper';
import { ListUserRequestMapper } from '../../../mappers/ListUserRequestMapper';

export class UserController {
  constructor(
    private readonly service: UserService,
  ) {
    this.get = this.get.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.resendInvite = this.resendInvite.bind(this);
  }

  async get(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const user = await this.service.get(+request.params.id);

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }

  async list(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = ListUserRequestMapper.map(request);
      const { pagination, users } = await this.service.list(body);

      return response.json({ pagination, users });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = CreateUserRequestMapper.map(request);
      const user = await this.service.create(body);

      return response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const id = +request.params.id;
      const user = await this.service.delete(id);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async resendInvite(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const id = +request.params.id;
      const userVerification = this.service.resendInvite(id);

      return response.status(200).json(userVerification);
    } catch (error) {
      next(error);
    }
  }

}
