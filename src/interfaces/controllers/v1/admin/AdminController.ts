import { NextFunction, Request, Response } from 'express';

import { AdminService } from '../../../../application/services/AdminService';
import { CreateAdminRequestMapper } from '../../../mappers/CreateAdminRequestMapper';

export class AdminController {
  constructor(
    private readonly service: AdminService,
  ) {
    this.get = this.get.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
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
      const { users } = await this.service.list();

      return response.json({ users });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = CreateAdminRequestMapper.map(request);
      const user = await this.service.create(body);

      return response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

}
