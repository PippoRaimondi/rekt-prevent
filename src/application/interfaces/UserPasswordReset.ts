import { User } from '../../domain/entities/User';
import { UserPasswordReset } from '../../domain/entities/UserPasswordReset';

export type UserPasswordResetWithRelations = UserPasswordReset & {
  user: User;
};
