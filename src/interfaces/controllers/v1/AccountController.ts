import { NextFunction, Request, Response } from 'express';

import { UserDeviceService } from '../../../application/services/UserDeviceService';
import { UserService } from '../../../application/services/UserService';
import { User } from '../../../domain/entities/User';
import { CreateUserDeviceRequestMapper } from '../../mappers/CreateUserDeviceRequestMapper';
import { ResetPasswordRequestMapper } from '../../mappers/ResetPasswordRequestMapper';
import { UpdateUserRequestMapper } from '../../mappers/UpdateUserRequestMapper';

export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly userDeviceService: UserDeviceService
  ) {
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.welcome = this.welcome.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    this.getAllDevices = this.getAllDevices.bind(this);
    this.createDevice = this.createDevice.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
  }

  async get(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const loggedUser = request.user as User;
      const user = await this.userService.get(loggedUser.id as number);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async welcome(request: Request, response: Response): Promise<any> {
    try {
      const { token } = request.params;
      const userWithToken = await this.userService.validateWelcomeToken(token);

      return response.json(userWithToken);
    } catch (error) {
      return response.status(404).end();
    }
  }

  async resetPassword(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = ResetPasswordRequestMapper.map(request);
      await this.userService.resetPassword(body);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = UpdateUserRequestMapper.map(request);
      const user = await this.userService.update(body);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllDevices(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const devices = await this.userDeviceService.list(request.user as User);

      return response.status(200).json(devices);
    } catch (error) {
      next(error);
    }
  }

  async createDevice(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = CreateUserDeviceRequestMapper.map(request);
      const device = await this.userDeviceService.create(body);

      return response.status(201).json(device);
    } catch (error) {
      next(error);
    }
  }

  async deleteDevice(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const { token } = request.params;
      const device = await this.userDeviceService.delete(token, request.user as User);

      return response.status(200).json(device);
    } catch (error) {
      next(error);
    }
  }
}
