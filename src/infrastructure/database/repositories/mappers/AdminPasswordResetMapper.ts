import { AdminPasswordResetWithRelations } from '../../../../application/interfaces/AdminPasswordReset';
import { AdminPasswordReset } from '../../../../domain/entities/AdminPasswordReset';
import { AdminMapper } from './AdminMapper';

export class AdminPasswordResetMapper {
  static mapFromDatabase(record: any): AdminPasswordResetWithRelations {
    return {
      token: record['token'],
      adminId: +record['admin_id'],
      createdAt: record['created_at'],
      expiresAt: record['expires_at'],
      verifiedAt: record['verified_at'] ?? null,
      admin: AdminMapper.mapFromDatabase(record, 'admin_'),
    };
  }

  static mapToDatabase(entity: AdminPasswordReset): any {
    const { createdAt, expiresAt, verifiedAt } = entity;

    return {
      ...entity,
      createdAt: createdAt ? createdAt.toISOString() : null,
      expiresAt: expiresAt.toISOString(),
      verifiedAt: verifiedAt ? verifiedAt.toISOString() : null,
    };
  }
}
