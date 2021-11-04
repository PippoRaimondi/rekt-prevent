import { UserDevice } from '../entities/UserDevice';
import { UserDeviceResponse } from '../interfaces/responses/UserDeviceResponse';

export class UserDeviceMapper {
  static map(entity: UserDevice): UserDeviceResponse {
    const { family, token, type, createdAt } = entity;

    return {
      family,
      type,
      token,
      createdAt,
    };
  }
}
