import { AuthenticableUser } from '../interfaces/AuthenticableUser';
import { SoftDelete } from '../interfaces/SoftDelete';
import { Timestampable } from '../interfaces/Timestamble';

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

export enum UserRole {
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

export type User = AuthenticableUser &
  Timestampable &
  SoftDelete & {
    id: number;
    name: string;
    status: UserStatus;
    phone: string | null;
    createdById: number;
    lastLoginAt?: Date;
  };
