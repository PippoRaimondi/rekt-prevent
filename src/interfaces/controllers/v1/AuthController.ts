import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { AuthService } from '../../../application/services/AuthService';
import { UserService } from '../../../application/services/UserService';
import { User } from '../../../domain/entities/User';

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.login = this.login.bind(this);
    this.authorize = this.authorize.bind(this);
    this.recaptcha = this.recaptcha.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.loginWithRecaptcha = this.loginWithRecaptcha.bind(this);
    this.validateForgotPasswordToken = this.validateForgotPasswordToken.bind(this);
  }

  async recaptcha(request: Request, response: Response, next: NextFunction): Promise<void> {
    return response.send(response.recaptcha).end();
  }

  async loginWithRecaptcha(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    if (request.recaptcha?.error) {
      return response.status(404).send({ error: request.recaptcha?.error });
    }

    return this.login(request, response, next);
  }

  async login(request: Request, response: Response, next: NextFunction): Promise<Response> {

    // if (request.recaptcha?.error) {
    //   return response.status(404).send({ error: request.recaptcha?.error });
    // }

    return await passport.authenticate(
      'user-local',
      { session: false },
      async (error, user?: User) => {
        if (error || !user) {
          return response.status(404).end();
        }

        const token = this.authService.generateToken(user as User);
        const userWithPortfolio = await this.userService.get(user.id);

        return response.json({
          token,
          user: userWithPortfolio,
        });
      }
    )(request, response, next);
  }

  async forgotPassword(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = request.body;
      await this.userService.forgotPassword(email);

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
      const adminWithToken = await this.userService.validateForgotPasswordToken(token);

      return response.json(adminWithToken);
    } catch (error) {
      next(error);
    }
  }

  async authorize(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return await passport.authenticate(
      'user-jwt',
      { session: false },
      (error, user: User, token) => {
        if (error || token instanceof Error) {
          return response.status(401).end();
        }

        return next();
      }
    )(request, response, next);
  }
}
