import { Admin } from '../../domain/entities/Admin';
import { NewAdmin } from '../interfaces/Admin';
import { AuthenticableRepository } from './AuthenticableRepository';

export interface AdminRepository extends AuthenticableRepository {
  
  create(user: NewAdmin): Promise<Admin>;
  update(entity: Admin): Promise<boolean>;

  findById(id: number): Promise<Admin>;
  findByEmail(email: string): Promise<Admin>;
  findAll(
  ): Promise<[Admin[], number]>;
}  
