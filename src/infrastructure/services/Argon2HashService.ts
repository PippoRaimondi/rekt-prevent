import { hash, verify } from 'argon2';

import { HashService } from '../../application/services/HashService';

export class Argon2HashService implements HashService {
  hash(plain: string): Promise<string> {
    return hash(plain);
  }

  isEquals(plain: string, hashed: string): Promise<boolean> {
    return verify(hashed, plain);
  }
}
