import { Request } from 'express';
import { Strategy as JWTStrategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import {
  IStrategyOptionsWithRequest,
  IVerifyOptions,
  Strategy as LocalStrategy,
} from 'passport-local';

import { Config } from '../../application/config/Config';
import { InvalidLoginError } from '../../application/errors/InvalidLoginError';
import { AuthService } from '../../application/services/AuthService';
import { AuthenticableUser } from '../../domain/interfaces/AuthenticableUser';

export abstract class PassportMiddleware {
  private readonly service: AuthService;
  protected readonly config: Config;

  constructor(config: Config, service: AuthService) {
    this.config = config;
    this.service = service;
  }

  abstract customValidation(entity: AuthenticableUser): Promise<boolean>;
  abstract getLocalStrategyOptions(): IStrategyOptionsWithRequest;
  abstract getJWTStrategyOptions(): StrategyOptions;
  abstract afterLogin(entity: AuthenticableUser): Promise<void>;

  async isValidUser(entity: AuthenticableUser, password: string): Promise<boolean> {
    if (!entity) {
      return false;
    }

    const isValid = await this.customValidation(entity);
    if (!isValid) {
      return false;
    }

    // Compare passwords
    const samePassword = await this.service.comparePassword(password, entity.password);
    if (!samePassword) {
      return false;
    }

    return true;
  }

  getLocalStrategy(): LocalStrategy {
    return new LocalStrategy(
      this.getLocalStrategyOptions(),
      async (
        request: Request,
        email: string,
        password: string,
        done: (error: any, user?: AuthenticableUser, options?: IVerifyOptions) => void
      ) => {
        try {
          const entity = await this.service.findByLogin(email);
          const isValidUser = await this.isValidUser(entity, password);
          if (!isValidUser) {
            throw new InvalidLoginError();
          }

          // Update request
          request.user = entity;

          await this.afterLogin(entity);

          return done(null, entity);
        } catch (error) {
          return done(error, undefined, { message: 'Invalid email and/or password' });
        }
      }
    );
  }

  getJWTStrategy(): JWTStrategy {
    return new JWTStrategy(
      this.getJWTStrategyOptions(),
      async (request: Request, payload: any, done: VerifiedCallback) => {
        try {
          const entity = await this.service.findByLogin(payload.email);

          // Update request
          request.user = entity;

          await this.afterLogin(entity);

          return done(null, entity);
        } catch (error) {
          return done(error, null);
        }
      }
    );
  }
}
