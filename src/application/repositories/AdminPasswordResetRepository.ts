import { AdminPasswordReset } from '../../domain/entities/AdminPasswordReset';
import { AdminPasswordResetWithRelations } from '../interfaces/AdminPasswordReset';

export interface AdminPasswordResetRepository {
  create(entity: AdminPasswordReset): Promise<boolean>;
  updateVerifiedAt(entity: AdminPasswordReset): Promise<boolean>;

  findByToken(token: string): Promise<AdminPasswordResetWithRelations>;
}
