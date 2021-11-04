import { UserRole, UserStatus } from '../../entities/User';
import { Pagination } from '../Pagination';
import { AdminResponse } from './AdminResponse';
import { UserDeviceResponse } from './UserDeviceResponse';


export interface UserResponse {
  id: number;
  name: string;
  status: UserStatus;
  phone: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: AdminResponse | null;
  devices: UserDeviceResponse[];
  role?: UserRole;
  lastLoginAt?: Date;
}

export type ListUserResponse = {
  users: UserResponse[];
  pagination: Pagination;
};

export type UserResponseWithToken = {
  token: string;
  user: UserResponse;
};
