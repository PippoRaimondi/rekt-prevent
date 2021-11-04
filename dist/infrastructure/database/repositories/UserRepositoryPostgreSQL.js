"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const User_1 = require("../../../application/interfaces/User");
const UserMapper_1 = require("./mappers/UserMapper");
class UserRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'users';
    }
    findByLogin(email) {
        return this.findByEmail(email);
    }
    async create(user) {
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
        const record = await this.db.oneOrNone(query, UserMapper_1.UserMapper.mapToDatabase(user));
        return UserMapper_1.UserMapper.mapFromDatabase(record);
    }
    async update(user) {
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
        const result = await this.db.result(query, UserMapper_1.UserMapper.mapToDatabase(user));
        return result.rowCount > 0;
    }
    async delete(user) {
        return await this.update(Object.assign(Object.assign({}, user), { deletedAt: new Date() }));
    }
    async findAll(filter, orderBy, limit, offset) {
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
            const count = t.one(`SELECT COUNT(1) FROM ${this.TABLE_NAME} u WHERE ${whereClause}`, parameters);
            return t.batch([records, count]);
        });
        return [
            [...records.map((record) => UserMapper_1.UserMapper.mapFromDatabase(record))],
            +countResult['count'] || 0,
        ];
    }
    async findById(id) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return UserMapper_1.UserMapper.mapFromDatabase(record);
    }
    async findByEmail(email) {
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
            throw new NotFoundError_1.NotFoundError();
        }
        return UserMapper_1.UserMapper.mapFromDatabase(record);
    }
    getWhereClause(filter) {
        const { name, email } = filter;
        const parameters = {};
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
    getOrderByClause(orderBy) {
        const sortBy = orderBy.sortColumn === User_1.UserSortBy.NAME ? 'u.name' : 'u.created_at';
        return `${sortBy} ${orderBy.direction}`;
    }
}
exports.UserRepositoryPostgreSQL = UserRepositoryPostgreSQL;
//# sourceMappingURL=UserRepositoryPostgreSQL.js.map