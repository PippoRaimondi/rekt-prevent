import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { TokenFilter, NewToken } from '../../../application/interfaces/Token';
import { TokenRepository } from '../../../application/repositories/TokenRepository';
import { Token } from '../../../domain/entities/Token';
import { IDatabaseExtended } from '../RepositoryFactory';
import { TokenMapper } from './mappers/TokenMapper';

export type Arguments = Partial<Token> & {
  id?: number;
  limit: number;
  offset: number;
};

export class TokenRepositoryPostgreSQL implements TokenRepository {
  private readonly TABLE_NAME = 'tokens';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(token: NewToken): Promise<Token> {
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

    const record = await this.db.oneOrNone(query, TokenMapper.mapToDatabase(token));

    return TokenMapper.mapFromDatabase(record);
  }

  async update(id: number, token: NewToken): Promise<boolean> {
    const query = `
UPDATE ${this.TABLE_NAME} 
    set token_desc = \${description}
  , chain = \${chain}
  , initial_price = \${price}
WHERE 
    id =  \${id}
    `;

    const newToken = TokenMapper.mapToDatabase(token);
    newToken.id = id;
    const result = await this.db.result(query, newToken);

    return result.rowCount > 0;
  }

  async delete(id: number): Promise<boolean> {
    const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  id = $\{id}
`;
    const result = await this.db.result(query, { id: id });

    return result.rowCount > 0;
  }

  async findById(id: number): Promise<Token> {
    const [record] = await this.findBy({ id, limit: 1, offset: 0 });
    if (record.length == 0) {
      throw new NotFoundError();
    }

    return record[0];
  }

  findAll(filter: Partial<Token>, limit: number, offset: number): Promise<[Token[], number]> {
    return this.findBy({ ...filter, limit, offset });
  }

  async findBy(args: Arguments): Promise<[Token[], number]> {
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
      const count = t.one(
        `SELECT COUNT(1) FROM ${this.TABLE_NAME} t WHERE ${whereClause}`,
        parameters
      );

      return t.batch([records, count]);
    });

    if (!records) {
      return [[], 0];
    }

    return [
      [...records.map((record: any) => TokenMapper.mapFromDatabase(record))],
      +countResult['count'] || 0,
    ];
  }

  private getWhereClause(args: Arguments): [string, any] {
    const { chain, description, id } = args;
    console.log(args);
    const parameters: any = {};

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
