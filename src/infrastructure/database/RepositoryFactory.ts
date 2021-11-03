/* eslint-disable @typescript-eslint/no-use-before-define */
import { attach } from 'pg-monitor';
import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise';

import { Config } from '../../application/config/Config';
import {
  PortfolioRepositoryPostgreSQL,
  TokenRepositoryPostgreSQL,
} from './repositories';


interface Extensions {
  portfolio: PortfolioRepositoryPostgreSQL;
  token: TokenRepositoryPostgreSQL;
}

export type IDatabaseExtended = IDatabase<Extensions> & Extensions;

export class RepositoryFactory {
  constructor(private readonly config: Config) {}

  // TODO Create an interface fot it
  create(): { db: IDatabaseExtended; pgp: IMain } {
    const initOptions: IInitOptions<Extensions> = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extend(obj: IDatabaseExtended, dc: any) {
        obj.portfolio = new PortfolioRepositoryPostgreSQL(obj, pgp);
        obj.token = new TokenRepositoryPostgreSQL(obj, pgp);
      },
    };

    const pgp: IMain = pgPromise(initOptions);

    // For non-produciton environment, we will logs all queries
    if (!['production', 'test'].includes(this.config.environment)) {
      attach(initOptions);
    }

    const { host, password, username, dbname, port } = this.config.database;
    const db: IDatabaseExtended = pgp(
      `postgres://${username}:${password}@${host}:${port}/${dbname}`
    );

    return { db, pgp };
  }
}
