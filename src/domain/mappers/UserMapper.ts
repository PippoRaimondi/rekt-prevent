import { UserWithRelations, UserWithRole } from '../../application/interfaces/User';
import { User } from '../entities/User';
import { UserDevice } from '../entities/UserDevice';
import { UserSettings } from '../entities/UserSettings';
import { UserDeviceResponse } from '../interfaces/responses/UserDeviceResponse';
import { UserResponse } from '../interfaces/responses/UserResponse';
import { AdminMapper } from './AdminMapper';
import { UserDeviceMapper } from './UserDeviceMapper';

export class UserMapper {
  /**
   * @deprecated
   */
  static toJSON(entity: User | UserWithRelations): UserResponse {
    return this.map(entity);
  }

  static map(entity: User | UserWithRelations): UserResponse {
    const {
      createdAt,
      createdBy,
      devices,
      email,
      id,
      name,
      phone,
      status,
      updatedAt,
      role,
      lastLoginAt,
    } = entity as UserWithRelations;

    return {
      id: +id,
      name,
      status,
      phone,
      email,
      createdAt: createdAt as Date,
      updatedAt: updatedAt as Date,
      createdBy: createdBy ? AdminMapper.map(createdBy) : null,
      devices: this.mapDevices(devices),
      role,
      lastLoginAt,
    };
  }

  private static mapDevices(devices: UserDevice[]): UserDeviceResponse[] {
    if (!devices) {
      return [];
    }

    return devices.map((device) => UserDeviceMapper.map(device));
  }
}
