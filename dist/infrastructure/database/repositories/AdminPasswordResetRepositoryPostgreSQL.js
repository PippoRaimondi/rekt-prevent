"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPasswordResetRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const AdminPasswordResetMapper_1 = require("./mappers/AdminPasswordResetMapper");
class AdminPasswordResetRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'admin_password_resets';
    }
    async create(entity) {
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
        const result = await this.db.result(query, AdminPasswordResetMapper_1.AdminPasswordResetMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async updateVerifiedAt(entity) {
        const query = `
UPDATE
  ${this.TABLE_NAME}
SET
  verified_at = \${verifiedAt}
WHERE
  token = \${token}
  AND verified_at IS NULL
`;
        const result = await this.db.result(query, AdminPasswordResetMapper_1.AdminPasswordResetMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
    async findByToken(token) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return AdminPasswordResetMapper_1.AdminPasswordResetMapper.mapFromDatabase(record);
    }
}
exports.AdminPasswordResetRepositoryPostgreSQL = AdminPasswordResetRepositoryPostgreSQL;
//# sourceMappingURL=AdminPasswordResetRepositoryPostgreSQL.js.map