import { User } from '../../domain/entities/User';
import { NewUser, UserFilter, UserOrderBy, UserWithAdmin } from '../interfaces/User';
import { AuthenticableRepository } from './AuthenticableRepository';

export interface UserRepository extends AuthenticableRepository {
  create(user: NewUser): Promise<User>;
  update(user: User): Promise<boolean>;
  delete(report: User): Promise<boolean>;

  findAll(
    filter: UserFilter,
    orderBy: UserOrderBy,
    limit: number,
    offset: number
  ): Promise<[User[], number]>;
  findById(id: number): Promise<UserWithAdmin>;
  findByEmail(email: string): Promise<UserWithAdmin>;
}
