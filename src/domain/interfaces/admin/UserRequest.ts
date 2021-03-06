import { Admin } from '../../entities/Admin';

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdBy?: Admin;
};
