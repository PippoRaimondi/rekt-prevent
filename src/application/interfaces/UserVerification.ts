import { User } from '../../domain/entities/User';
import { UserVerification } from '../../domain/entities/UserVerification';

export type UserVerificationWithRelations = UserVerification & {
  user: User;
};
