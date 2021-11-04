import { Admin } from '../../domain/entities/Admin';
import { AuthenticableRepository } from './AuthenticableRepository';

export interface AdminRepository extends AuthenticableRepository {
  update(entity: Admin): Promise<boolean>;

  findById(id: number): Promise<Admin>;
  findByEmail(email: string): Promise<Admin>;
}
