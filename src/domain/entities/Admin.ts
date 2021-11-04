import { AuthenticableUser } from '../interfaces/AuthenticableUser';

export type Admin = AuthenticableUser & {
  id: number;
  name: string;
};
