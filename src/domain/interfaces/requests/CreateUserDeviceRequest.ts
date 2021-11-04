import { User } from '../../entities/User';

export type CreateUserDeviceRequest = {
  user: User;
  type?: string;
  token: string;
  family: 'ios' | 'android';
};
