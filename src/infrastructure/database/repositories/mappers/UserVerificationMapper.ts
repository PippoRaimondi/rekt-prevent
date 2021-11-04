import { UserVerificationWithRelations } from '../../../../application/interfaces/UserVerification';
import { UserVerification } from '../../../../domain/entities/UserVerification';
import { UserMapper } from './UserMapper';

export class UserVerificationMapper {
  static mapFromDatabase(record: any): UserVerificationWithRelations {
    return {
      token: record['token'],
      userId: +record['user_id'],
      createdAt: record['created_at'],
      updatedAt: record['updated_at'],
      verifiedAt: record['verified_at'] ?? null,
      user: UserMapper.mapFromDatabase(record, 'user_'),
    };
  }

  static mapToDatabase(entity: UserVerification): any {
    const { createdAt, updatedAt, verifiedAt } = entity;

    return {
      ...entity,
      createdAt: createdAt ? createdAt.toISOString() : null,
      updatedAt: updatedAt ? updatedAt.toISOString() : null,
      verifiedAt: verifiedAt ? verifiedAt.toISOString() : null,
    };
  }
}
