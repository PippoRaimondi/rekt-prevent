import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import {
  NewUser,
  UserFilter,
  UserOrderBy,
  UserSortBy,
  UserWithAdmin,
} from '../../../application/interfaces/User';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { AuthenticableUser } from '../../../domain/interfaces/AuthenticableUser';
import { IDatabaseExtended } from '../RepositoryFactory';
import { UserMapper } from './mappers/UserMapper';

export class UserRepositoryPostgreSQL implements UserRepository {
  private readonly TABLE_NAME = 'users';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  findByLogin(email: string): Promise<AuthenticableUser> {
    return this.findByEmail(email);
  }

  async create(user: NewUser): Promise<User> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  name
  , status
  , phone
  , created_by
  , email
  , password
)
VALUES (
  \${name}
  , \${status}
  , \${phone}
  , \${createdById}
  , \${email}
  , \${password}
)
RETURNING
  id
  , name
  , status
  , phone
  , created_by
  , email
  , password
  , created_at
  , updated_at`;
    const record = await this.db.oneOrNone(query, UserMapper.mapToDatabase(user));

    return UserMapper.mapFromDatabase(record);
  }

  async update(user: User): Promise<boolean> {
    const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  name = \${name}
  , status = \${status}
  , phone = \${phone}
  , created_by = \${createdById}
  , email = \${email}
  , password = \${password}
  , deleted_at = \${deletedAt}
  , last_login_at = \${lastLoginAt}
WHERE
  id = \${id}`;
    const result = await this.db.result(query, UserMapper.mapToDatabase(user));

    return result.rowCount > 0;
  }

  async delete(user: User): Promise<boolean> {
    return await this.update({
      ...user,
      deletedAt: new Date(),
    });
  }

  async findAll(
    filter: UserFilter,
    orderBy: UserOrderBy,
    limit: number,
    offset: number
  ): Promise<[User[], number]> {
    const [whereClause, parameters] = this.getWhereClause(filter);

    const [records, countResult] = await this.db.tx((t) => {
      const usersQuery = `
SELECT
  id
  , name
  , status
  , phone
  , created_by
  , email
  , password
  , created_at
  , updated_at
  , deleted_at
  , last_login_at
FROM
  ${this.TABLE_NAME} u
WHERE
  ${whereClause}
ORDER BY
  ${this.getOrderByClause(orderBy)}
LIMIT
  ${limit}
OFFSET
  ${offset}
`;

      const records = t.manyOrNone(usersQuery, parameters);
      const count = t.one(
        `SELECT COUNT(1) FROM ${this.TABLE_NAME} u WHERE ${whereClause}`,
        parameters
      );

      return t.batch([records, count]);
    });

    return [
      [...records.map((record: any) => UserMapper.mapFromDatabase(record))],
      +countResult['count'] || 0,
    ];
  }

  async findById(id: number): Promise<UserWithAdmin> {
    const query = `
SELECT
  u.id
  , u.name
  , u.status
  , u.phone
  , u.created_by
  , adm.id AS "created_by_id"
  , adm.name AS "created_by_name"
  , adm.email AS "created_by_email"
  , adm.password AS "created_by_password"
  , u.email
  , u.password
  , u.created_at
  , u.updated_at
  , u.deleted_at
  , u.last_login_at
FROM
  ${this.TABLE_NAME} u
JOIN
  admins adm ON adm.id = u.created_by
WHERE
  u.id = \${id}
  AND u.deleted_at IS NULL
    `;

    const record = await this.db.oneOrNone(query, { id });
    if (!record) {
      throw new NotFoundError();
    }

    return UserMapper.mapFromDatabase(record) as UserWithAdmin;
  }

  async findByEmail(email: string): Promise<UserWithAdmin> {
    const query = `
SELECT
  u.id
  , u.name
  , u.status
  , u.phone
  , u.created_by
  , adm.id AS "created_by_id"
  , adm.name AS "created_by_name"
  , adm.email AS "created_by_email"
  , adm.password AS "created_by_password"
  , u.email
  , u.password
  , u.created_at
  , u.updated_at
  , u.last_login_at
FROM
  ${this.TABLE_NAME} u
JOIN
  admins adm ON adm.id = u.created_by
WHERE
  u.email = \${email}
  AND u.deleted_at IS NULL
    `;

    const record = await this.db.oneOrNone(query, { email });
    if (!record) {
      throw new NotFoundError();
    }

    return UserMapper.mapFromDatabase(record) as UserWithAdmin;
  }

  private getWhereClause(filter: UserFilter): [string, any] {
    const { name, email } = filter;
    const parameters: any = {};

    let where = `u.deleted_at IS NULL`;
    if (name) {
      where = `${where} AND u.name ILIKE \${name}`;
      parameters.name = `%${name}%`;
    }

    if (email) {
      where = `${where} AND u.email ILIKE \${email}`;
      parameters.email = `%${email}%`;
    }

    return [where, parameters];
  }

  private getOrderByClause(orderBy: UserOrderBy): string {
    const sortBy = orderBy.sortColumn === UserSortBy.NAME ? 'u.name' : 'u.created_at';

    return `${sortBy} ${orderBy.direction}`;
  }
}
