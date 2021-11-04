import { UserDevice } from '../../../../domain/entities/UserDevice';

export class UserDeviceMapper {
  static mapFromDatabase(record: any): UserDevice {
    return {
      userId: +record['user_id'],
      token: record['device_token'],
      type: record['device_type'],
      family: record['device_family'],
      createdAt: record['created_at'],
    };
  }

  static mapToDatabase(entity: UserDevice): any {
    const { createdAt } = entity;

    return {
      ...entity,
      createdAt: createdAt ? createdAt.toISOString() : null,
    };
  }
}
