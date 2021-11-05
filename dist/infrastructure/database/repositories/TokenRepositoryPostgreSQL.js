"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryPostgreSQL = void 0;
const NotFoundError_1 = require("../../../application/errors/NotFoundError");
const TokenMapper_1 = require("./mappers/TokenMapper");
class TokenRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.TABLE_NAME = 'tokens';
    }
    async create(token) {
        const query = `
INSERT INTO ${this.TABLE_NAME} (
    token_desc
  , chain
  , initial_price
)
VALUES (
  \${description}
  , \${chain}
  , \${price}
)
RETURNING
  id
  , token_desc
  , chain
  , initial_price
    `;
        const record = await this.db.oneOrNone(query, TokenMapper_1.TokenMapper.mapToDatabase(token));
        return TokenMapper_1.TokenMapper.mapFromDatabase(record);
    }
    async update(id, token) {
        const query = `
UPDATE ${this.TABLE_NAME} 
    set token_desc = \${description}
  , chain = \${chain}
  , initial_price = \${price}
WHERE 
    id =  \${id}
    `;
        const newToken = TokenMapper_1.TokenMapper.mapToDatabase(token);
        newToken.id = id;
        const result = await this.db.result(query, newToken);
        return result.rowCount > 0;
    }
    async delete(id) {
        const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  id = $\{id}
`;
        const result = await this.db.result(query, { id: id });
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
  t.id
  , t.token_desc
  , t.chain
  , t.initial_price
FROM
  ${this.TABLE_NAME} t
WHERE
  ${whereClause}
ORDER BY
  t.token_desc ASC
LIMIT
  ${args.limit}
OFFSET
  ${args.offset}
      `;
            const records = t.manyOrNone(query, parameters);
            const count = t.one(`SELECT COUNT(1) FROM ${this.TABLE_NAME} t WHERE ${whereClause}`, parameters);
            return t.batch([records, count]);
        });
        if (!records) {
            return [[], 0];
        }
        return [
            [...records.map((record) => TokenMapper_1.TokenMapper.mapFromDatabase(record))],
            +countResult['count'] || 0,
        ];
    }
    getWhereClause(args) {
        const { chain, description, id } = args;
        console.log(args);
        const parameters = {};
        let whereClause = `1=1`;
        if (id) {
            whereClause = `${whereClause} AND t.id = \${id}`;
            parameters.id = id;
        }
        if (description) {
            whereClause = `${whereClause} AND t.token_desc like '%${description}%'`;
            parameters.description = description;
        }
        if (chain) {
            whereClause = `${whereClause} AND t.chain like '%${chain}%'`;
            parameters.chain = chain;
        }
        return [whereClause, parameters];
    }
}
exports.TokenRepositoryPostgreSQL = TokenRepositoryPostgreSQL;
//# sourceMappingURL=TokenRepositoryPostgreSQL.js.map