import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { UserPasswordResetWithRelations } from '../../../application/interfaces/UserPasswordReset';
import { UserPasswordResetRepository } from '../../../application/repositories/UserPasswordResetRepository';
import { UserPasswordReset } from '../../../domain/entities/UserPasswordReset';
import { IDatabaseExtended } from '../RepositoryFactory';
import { UserPasswordResetMapper } from './mappers/UserPasswordResetMapper';

export class UserPasswordResetRepositoryPostgreSQL implements UserPasswordResetRepository {
  private readonly TABLE_NAME = 'user_password_resets';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(entity: UserPasswordReset): Promise<boolean> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  token
  , user_id
  , created_at
  , expires_at
  , verified_at
)
VALUES (
  \${token}
  , \${userId}
  , \${createdAt}
  , \${expiresAt}
  , \${verifiedAt}
)`;

    const result = await this.db.result(query, UserPasswordResetMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async updateVerifiedAt(entity: UserPasswordReset): Promise<boolean> {
    const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  verified_at = \${verifiedAt}
WHERE
  token = \${token}
  AND verified_at IS NULL
`;

    const result = await this.db.result(query, UserPasswordResetMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async findByToken(token: string): Promise<UserPasswordResetWithRelations> {
    const query = `
SELECT
  password_resets.token
  , password_resets.user_id
  , password_resets.created_at
  , password_resets.expires_at
  , password_resets.verified_at
  , u.name AS "user_name"
  , u.status AS "user_status"
  , u.phone AS "user_phone"
  , u.created_by AS "user_created_by"
  , u.email AS "user_email"
  , u.password AS "user_password"
  , u.created_at AS "user_created_at"
  , u.updated_at AS "user_updated_at"
  , u.deleted_at AS "user_deleted_at"
FROM
  ${this.TABLE_NAME} password_resets
JOIN
  users u ON u.id = password_resets.user_id
WHERE
  password_resets.token = \${token}
    `;

    const record = await this.db.oneOrNone(query, { token });
    if (!record) {
      throw new NotFoundError();
    }

    return UserPasswordResetMapper.mapFromDatabase(record);
  }
}
