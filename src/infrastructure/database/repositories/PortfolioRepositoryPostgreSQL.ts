import { IMain } from 'pg-promise';

import { NotFoundError } from '../../../application/errors/NotFoundError';
import { PortfolioFilter, NewPortfolio } from '../../../application/interfaces/Portfolio';
import { PortfolioRepository } from '../../../application/repositories/PortfolioRepository';
import { Portfolio } from '../../../domain/entities/Portfolio';
import { IDatabaseExtended } from '../RepositoryFactory';
import { PortfolioMapper } from './mappers/PortfolioMapper';

export type Arguments = PortfolioFilter & {
  id?: number;
  limit: number;
  offset: number;
};

export class PortfolioRepositoryPostgreSQL implements PortfolioRepository {
  private readonly TABLE_NAME = 'portfolio';

  constructor(private db: IDatabaseExtended, private pgp: IMain) {}

  async create(portfolio: NewPortfolio): Promise<Portfolio> {
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

    const record = await this.db.oneOrNone(query, PortfolioMapper.mapToDatabase(portfolio));

    return PortfolioMapper.mapFromDatabase(record);
  }

  async delete(portfolio: Portfolio): Promise<boolean> {
    const query = `
DELETE FROM
  ${this.TABLE_NAME}
WHERE
  id = $\{id}
`;
    const result = await this.db.result(query, { id: portfolio.id });

    return result.rowCount > 0;
  }

  async findById(id: number): Promise<Portfolio> {
    const [record] = await this.findBy({ id, limit: 1, offset: 0 });
    if (record.length == 0) {
      throw new NotFoundError();
    }

    return record[0];
  }

  findAll(filter: PortfolioFilter, limit: number, offset: number): Promise<[Portfolio[], number]> {
    return this.findBy({ ...filter, limit, offset });
  }

  async findBy(args: Arguments): Promise<[Portfolio[], number]> {
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
      const count = t.one(
        `SELECT COUNT(1) FROM ${this.TABLE_NAME} h WHERE ${whereClause}`,
        parameters
      );

      return t.batch([records, count]);
    });

    if (!records) {
      return [[], 0];
    }

    return [
      [...records.map((record: any) => PortfolioMapper.mapFromDatabase(record))],
      +countResult['count'] || 0,
    ];
  }

  private getWhereClause(args: Arguments): [string, any] {
    const { name, id } = args;
    const parameters: any = {};

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
