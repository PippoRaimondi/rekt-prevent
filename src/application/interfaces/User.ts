import { Admin } from '../../domain/entities/Admin';
import { User, UserRole } from '../../domain/entities/User';
import { UserDevice } from '../../domain/entities/UserDevice';
import { UserSettings } from '../../domain/entities/UserSettings';
import { OrderBy } from './OrderBy';

export type NewUser = Omit<User, 'id'>;

export type UserWithAdmin = User & {
  createdBy: Admin;
};

export type UserWithRole = User & {
  role?: UserRole;
};

export type UserWithRelations = UserWithAdmin &
  UserWithRole & {
    devices: UserDevice[];
  };

export enum UserSortBy {
  CREATED_AT = 'createdAt',
  NAME = 'name',
}

export type UserFilter = Partial<User>;
export type UserOrderBy = OrderBy<UserSortBy>;
