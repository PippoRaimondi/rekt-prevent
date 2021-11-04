import { UserVerificationWithRelations } from '../../application/interfaces/UserVerification';
import { User } from '../entities/User';
import { UserVerification } from '../entities/UserVerification';
import { UserVerificationResponse } from '../interfaces/responses/UserVerificationResponse';
import { UserMapper } from './UserMapper';

export class UserVerificationMapper {
  static map(entity: UserVerification | UserVerificationWithRelations): UserVerificationResponse {
    const { token, user, verifiedAt } = entity as UserVerificationWithRelations;

    return {
      token,
      user: UserMapper.map(user as User),
      verifiedAt: verifiedAt ? (verifiedAt as Date) : undefined,
    };
  }
}
