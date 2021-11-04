import { UserPasswordReset } from '../../domain/entities/UserPasswordReset';
import { UserPasswordResetWithRelations } from '../interfaces/UserPasswordReset';

export interface UserPasswordResetRepository {
  create(entity: UserPasswordReset): Promise<boolean>;
  updateVerifiedAt(entity: UserPasswordReset): Promise<boolean>;

  findByToken(token: string): Promise<UserPasswordResetWithRelations>;
}
