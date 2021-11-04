import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { AdminService } from '../../../../application/services/AdminService';
import { Admin } from '../../../../domain/entities/Admin';
import { ResetPasswordRequestMapper } from '../../../mappers/ResetPasswordRequestMapper';

export class AuthController {
  private readonly service: AdminService;

  constructor(service: AdminService) {
    this.service = service;

    this.get = this.get.bind(this);
    this.login = this.login.bind(this);
    this.recaptcha = this.recaptcha.bind(this);
    this.authorize = this.authorize.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.validateForgotPasswordToken = this.validateForgotPasswordToken.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async authorize(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return await passport.authenticate('admin-jwt', { session: false }, (error, user, token) => {
      if (error || token instanceof Error) {
        console.log(token);
        return response.status(401).end();
      }

      return next();
    })(request, response, next);
  }

  async recaptcha(request: Request, response: Response, next: NextFunction): Promise<void> {
    return response.send(response.recaptcha).end();
  }

  async login(request: Request, response: Response, next: NextFunction): Promise<Response> {
    if (request.recaptcha?.error) {
      return response.status(404).send({ error: request.recaptcha?.error });
    }

    return await passport.authenticate(
      'admin-local',
      { session: false },
      async (error, user?: Admin) => {
        if (error || !user) {
          return response.status(404).end();
        }

        const adminWithToken = await this.service.generateToken(user as Admin);
        return response.json(adminWithToken);
      }
    )(request, response, next);
  }

  async get(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const loggedUser = request.user as Admin;
      const admin = await this.service.get(loggedUser.id as number);

      return response.json(admin);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = request.body;
      await this.service.forgotPassword(email);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async validateForgotPasswordToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token } = request.params;
      const adminWithToken = await this.service.validateForgotPasswordToken(token);

      return response.json(adminWithToken);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const body = ResetPasswordRequestMapper.map(request);
      const admin = await this.service.resetPassword(body);

      return response.status(200).json(admin);
    } catch (error) {
      next(error);
    }
  }
}
