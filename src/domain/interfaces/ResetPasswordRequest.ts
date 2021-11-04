import { Admin } from '../entities/Admin';
import { User } from '../entities/User';

export type ResetPasswordRequest = {
  password: string;
  passwordConfirmation: string;
  loggedUser: User | Admin;
};
