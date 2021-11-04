import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { AdminPasswordResetWithRelations } from '../../../application/interfaces/AdminPasswordReset';
import { AdminPasswordResetRepository } from '../../../application/repositories/AdminPasswordResetRepository';
import { AdminPasswordReset } from '../../../domain/entities/AdminPasswordReset';
import { IDatabaseExtended } from '../RepositoryFactory';
import { AdminPasswordResetMapper } from './mappers/AdminPasswordResetMapper';

export class AdminPasswordResetRepositoryPostgreSQL implements AdminPasswordResetRepository {
  private readonly TABLE_NAME = 'admin_password_resets';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(entity: AdminPasswordReset): Promise<boolean> {
    const query = `
INSERT INTO ${this.TABLE_NAME} (
  token
  , admin_id
  , created_at
  , expires_at
  , verified_at
)
VALUES (
  \${token}
  , \${adminId}
  , \${createdAt}
  , \${expiresAt}
  , \${verifiedAt}
)`;

    const result = await this.db.result(query, AdminPasswordResetMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async updateVerifiedAt(entity: AdminPasswordReset): Promise<boolean> {
    const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  verified_at = \${verifiedAt}
WHERE
  token = \${token}
  AND verified_at IS NULL
`;

    const result = await this.db.result(query, AdminPasswordResetMapper.mapToDatabase(entity));

    return result.rowCount > 0;
  }

  async findByToken(token: string): Promise<AdminPasswordResetWithRelations> {
    const query = `
SELECT
  password_resets.token
  , password_resets.admin_id
  , password_resets.created_at
  , password_resets.expires_at
  , password_resets.verified_at
  , admins.name as "admin_name"
  , admins.email as "admin_email"
  , admins.password as "admin_password"
FROM
  ${this.TABLE_NAME} password_resets
JOIN
  admins ON admins.id = password_resets.admin_id
WHERE
  password_resets.token = \${token}
    `;

    const record = await this.db.oneOrNone(query, { token });
    if (!record) {
      throw new NotFoundError();
    }

    return AdminPasswordResetMapper.mapFromDatabase(record);
  }
}
