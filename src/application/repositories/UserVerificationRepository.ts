import { UserVerification } from '../../domain/entities/UserVerification';
import { UserVerificationWithRelations } from '../interfaces/UserVerification';

export interface UserVerificationRepository {
  create(entity: UserVerification): Promise<boolean>;
  updateVerifiedAt(entity: UserVerification): Promise<boolean>;

  findByToken(token: string): Promise<UserVerificationWithRelations>;
}
