import { AuthenticableUser } from '../../domain/interfaces/AuthenticableUser';
import { AuthenticableRepository } from '../repositories/AuthenticableRepository';
import { HashService } from './HashService';
import { TokenService } from './TokenService';

export class AuthService {
  constructor(
    private readonly repository: AuthenticableRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {
    this.repository = repository;
    this.hashService = hashService;
    this.tokenService = tokenService;
  }

  findByLogin(email: string): Promise<AuthenticableUser> {
    return this.repository.findByLogin(email);
  }

  generateToken(user: AuthenticableUser): string {
    const { email } = user;

    return this.tokenService.generate(JSON.stringify({ email }));
  }

  comparePassword(plain: string, currentPassword: string): Promise<boolean> {
    return this.hashService.isEquals(plain, currentPassword);
  }

  generatePassword(password: string): Promise<string> {
    return this.hashService.hash(password);
  }
}
