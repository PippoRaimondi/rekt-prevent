import { UserDevice } from '../../domain/entities/UserDevice';

export interface UserDeviceRepository {
  create(entity: UserDevice): Promise<boolean>;

  delete(entity: UserDevice): Promise<boolean>;

  findAllByUserId(userId: number): Promise<UserDevice[]>;
  findByTokenAndUserId(token: string, userId: number): Promise<UserDevice>;
}
