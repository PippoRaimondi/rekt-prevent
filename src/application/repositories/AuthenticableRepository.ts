import { AuthenticableUser } from '../../domain/interfaces/AuthenticableUser';

export interface AuthenticableRepository {
  findByLogin(email: string): Promise<AuthenticableUser>;
  findById(id: number): Promise<AuthenticableUser>;
}
