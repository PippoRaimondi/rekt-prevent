import { UserPasswordResetWithRelations } from '../../../../application/interfaces/UserPasswordReset';
import { UserPasswordReset } from '../../../../domain/entities/UserPasswordReset';
import { UserMapper } from './UserMapper';

export class UserPasswordResetMapper {
  static mapFromDatabase(record: any): UserPasswordResetWithRelations {
    return {
      token: record['token'],
      userId: +record['user_id'],
      createdAt: record['created_at'],
      expiresAt: record['expires_at'],
      verifiedAt: record['verified_at'] ?? null,
      user: UserMapper.mapFromDatabase(record, 'user_'),
    };
  }

  static mapToDatabase(entity: UserPasswordReset): any {
    const { createdAt, expiresAt, verifiedAt } = entity;

    return {
      ...entity,
      createdAt: createdAt ? createdAt.toISOString() : null,
      expiresAt: expiresAt.toISOString(),
      verifiedAt: verifiedAt ? verifiedAt.toISOString() : null,
    };
  }
}
