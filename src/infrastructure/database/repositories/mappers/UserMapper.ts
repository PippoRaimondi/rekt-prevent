import { NewUser, UserWithAdmin } from '../../../../application/interfaces/User';
import { User, UserStatus } from '../../../../domain/entities/User';
import { AdminMapper } from './AdminMapper';

export class UserMapper {
  static mapFromDatabase(record: any, prefix = ''): User | UserWithAdmin {
    return {
      id: +record[`${prefix}id`],
      createdById: +record[`${prefix}created_by`],
      createdBy: record[`${prefix}created_by_name`]
        ? AdminMapper.mapFromDatabase(record, `${prefix}created_by_`)
        : undefined,
      email: record[`${prefix}email`],
      name: record[`${prefix}name`],
      password: record[`${prefix}password`],
      status: record[`${prefix}status`] as UserStatus,
      phone: record[`${prefix}phone`],
      createdAt: record[`${prefix}created_at`],
      updatedAt: record[`${prefix}updated_at`],
      deletedAt: record[`${prefix}deleted_at`] ?? undefined,
      lastLoginAt: record[`${prefix}last_login_at`] ?? undefined,
    };
  }

  static mapToDatabase(entity: User | NewUser): any {
    const { createdAt, deletedAt, updatedAt, lastLoginAt } = entity;

    return {
      ...entity,
      createdAt: createdAt ? createdAt.toISOString() : null,
      updatedAt: updatedAt ? updatedAt.toISOString() : null,
      deletedAt: deletedAt ? deletedAt.toISOString() : null,
      lastLoginAt: lastLoginAt ? lastLoginAt.toISOString() : null,
    };
  }
}
