"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const AdminMapper_1 = require("./mappers/AdminMapper");
class AdminRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'admins';
    }
    findByLogin(email) {
        return this.findByEmail(email);
    }
    async create(admin) {
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
        const record = await this.db.oneOrNone(query, AdminMapper_1.AdminMapper.mapToDatabase(admin));
        return AdminMapper_1.AdminMapper.mapFromDatabase(record);
    }
    async findAll() {
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
            const count = t.one(`SELECT COUNT(1) FROM ${this.TABLE_NAME} u`);
            return t.batch([records, count]);
        });
        return [
            [...records.map((record) => AdminMapper_1.AdminMapper.mapFromDatabase(record))],
            +countResult['count'] || 0,
        ];
    }
    async findById(id) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return AdminMapper_1.AdminMapper.mapFromDatabase(record);
    }
    async findByEmail(email) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return AdminMapper_1.AdminMapper.mapFromDatabase(record);
    }
    async update(entity) {
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
        const result = await this.db.result(query, AdminMapper_1.AdminMapper.mapToDatabase(entity));
        return result.rowCount > 0;
    }
}
exports.AdminRepositoryPostgreSQL = AdminRepositoryPostgreSQL;
//# sourceMappingURL=AdminRepositoryPostgreSQL.js.map