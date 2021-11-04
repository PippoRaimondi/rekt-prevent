import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { Config } from '../../application/config/Config';
import { AuthService } from '../../application/services/AuthService';
import { UserService } from '../../application/services/UserService';
import { User, UserStatus } from '../../domain/entities/User';
import { PassportMiddleware } from './PassportMiddleware';

export class UserPassportMiddleware extends PassportMiddleware {
  constructor(config: Config, service: AuthService, private readonly userService: UserService) {
    super(config, service);
  }

  async customValidation(entity: User): Promise<boolean> {
    return entity.status === UserStatus.ACTIVE;
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
      secretOrKey: this.config.jwt.userSecret,
      passReqToCallback: true,
    };
  }

  async afterLogin(entity: User): Promise<void> {
    await this.userService.updateLastLoginAt(entity);
  }
}
