import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { Config } from '../../application/config/Config';
import { AuthService } from '../../application/services/AuthService';
import { Admin } from '../../domain/entities/Admin';
import { PassportMiddleware } from './PassportMiddleware';

export class AdminPassportMiddleware extends PassportMiddleware {
  constructor(config: Config, service: AuthService) {
    super(config, service);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async customValidation(entity: Admin): Promise<boolean> {
    return true;
  }

  getLocalStrategyOptions(): IStrategyOptionsWithRequest {
    return {
      usernameField: 'email',
      passReqToCallback: true,
    };
  }

  getJWTStrategyOptions(): StrategyOptions {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.jwt.adminSecret,
      passReqToCallback: true,
    };
  }

  async afterLogin(entity: Admin): Promise<void> {
    return;
  }
}
