import { IMain } from 'pg-promise';
import { NewAdmin } from 'src/application/interfaces/Admin';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { AdminRepository } from '../../../application/repositories/AdminRepository';
import { Admin } from '../../../domain/entities/Admin';
import { AuthenticableUser } from '../../../domain/interfaces/AuthenticableUser';
import { IDatabaseExtended } from '../RepositoryFactory';
import { AdminMapper } from './mappers/AdminMapper';

export class AdminRepositoryPostgreSQL implements AdminRepository {
  private readonly TABLE_NAME = 'admins';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  findByLogin(email: string): Promise<AuthenticableUser> {
    return this.findByEmail(email);
  }

  async create(admin: NewAdmin): Promise<Admin> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  name
  , email
  , password
)
VALUES (
  \${name}
  , \${email}
  , \${password}
)
RETURNING
  id
  , name
  , email
  , password`;
    
  const record = await this.db.oneOrNone(query, AdminMapper.mapToDatabase(admin));

    return AdminMapper.mapFromDatabase(record);
  }

  async findAll(
  ): Promise<[Admin[], number]> {
    const [records, countResult] = await this.db.tx((t) => {
      const usersQuery = `
      SELECT
      admin.id
      , admin.name
      , admin.email
      , admin.password
    FROM
      ${this.TABLE_NAME} admin
`;

      const records = t.manyOrNone(usersQuery);
      const count = t.one(
        `SELECT COUNT(1) FROM ${this.TABLE_NAME} u`
      );

      return t.batch([records, count]);
    });

    return [
      [...records.map((record: any) => AdminMapper.mapFromDatabase(record))],
      +countResult['count'] || 0,
    ];
  } 



  async findById(id: number): Promise<Admin> {
    const query = `
SELECT
  admin.id
  , admin.name
  , admin.email
  , admin.password
FROM
  ${this.TABLE_NAME} admin
WHERE
  admin.id = \${id}
    `;

    const record = await this.db.oneOrNone(query, { id });
    if (!record) {
      throw new NotFoundError();
    }

    return AdminMapper.mapFromDatabase(record);
  }

  async findByEmail(email: string): Promise<Admin> {
    const query = `
SELECT
  admin.id
  , admin.name
  , admin.email
  , admin.password
FROM
  ${this.TABLE_NAME} admin
WHERE
  admin.email = \${email}
    `;

    const record = await this.db.oneOrNone(query, { email });
    if (!record) {
      throw new NotFoundError();
    }

    return AdminMapper.mapFromDatabase(record);
  }

  async update(entity: Admin): Promise<boolean> {
    const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  name = \${name}
  , email = \${email}
  , password = \${password}
WHERE
  id = \${id}
    `;

    const result = await this.db.result(query, AdminMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }
}
