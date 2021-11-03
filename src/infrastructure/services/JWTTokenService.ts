import { sign, SignOptions } from 'jsonwebtoken';

import { TokenService } from '../../application/services/TokenService';

export class JWTTokenService implements TokenService {
  private secret: string;

  private readonly tokenOptions: SignOptions = {
    algorithm: 'HS256',
  };

  constructor(secret: string) {
    this.secret = secret;
  }

  generate(payload: any): string {
    return sign(payload, this.secret, this.tokenOptions);
  }
}
