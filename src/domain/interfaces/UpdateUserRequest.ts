import { User } from '../entities/User';

export type SettingsRequest = {
};

export type UpdateUserRequest = {
  name?: string;
  phone?: string;

  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;

  loggedUser: User;
};
