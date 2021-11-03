"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const PortfolioMapper_1 = require("./mappers/PortfolioMapper");
class PortfolioRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'portfolio';
    }
    async create(portfolio) {
        const query = `
INSERT INTO ${this.TABLE_NAME} (
    name
  , user_id
)
VALUES (
  \${name}
  , \${user_id}
)
RETURNING
  id
  , name
  , user_id
    `;
        const record = await this.db.oneOrNone(query, PortfolioMapper_1.PortfolioMapper.mapToDatabase(portfolio));
        return PortfolioMapper_1.PortfolioMapper.mapFromDatabase(record);
    }
    async delete(portfolio) {
        const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  id = $\{id}
`;
        const result = await this.db.result(query, { id: portfolio.id });
        return result.rowCount > 0;
    }
    async findById(id) {
        const [record] = await this.findBy({ id, limit: 1, offset: 0 });
        if (record.length == 0) {
            throw new NotFoundError_1.NotFoundError();
        }
        return record[0];
    }
    findAll(filter, limit, offset) {
        return this.findBy(Object.assign(Object.assign({}, filter), { limit, offset }));
    }
    async findBy(args) {
        const [whereClause, parameters] = this.getWhereClause(args);
        const [records, countResult] = await this.db.tx((t) => {
            const query = `
SELECT
  p.id
  , p.name
  , p.user_id
FROM
  ${this.TABLE_NAME} h
WHERE
  ${whereClause}
ORDER BY
  p.name ASC
LIMIT
  ${args.limit}
OFFSET
  ${args.offset}
      `;
            const records = t.manyOrNone(query, parameters);
            const count = t.one(`SELECT COUNT(1) FROM ${this.TABLE_NAME} h WHERE ${whereClause}`, parameters);
            return t.batch([records, count]);
        });
        if (!records) {
            return [[], 0];
        }
        return [
            [...records.map((record) => PortfolioMapper_1.PortfolioMapper.mapFromDatabase(record))],
            +countResult['count'] || 0,
        ];
    }
    getWhereClause(args) {
        const { name, id } = args;
        const parameters = {};
        let whereClause = `1=1`;
        if (id) {
            whereClause = `${whereClause} AND h.id = \${id}`;
            parameters.id = id;
        }
        if (name) {
            whereClause = `${whereClause} AND name like \$%{name}%`;
            parameters.name = name;
        }
        return [whereClause, parameters];
    }
}
exports.PortfolioRepositoryPostgreSQL = PortfolioRepositoryPostgreSQL;
//# sourceMappingURL=PortfolioRepositoryPostgreSQL.js.map