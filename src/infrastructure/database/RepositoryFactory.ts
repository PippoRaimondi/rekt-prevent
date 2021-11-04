/* eslint-disable @typescript-eslint/no-use-before-define */
import { attach } from 'pg-monitor';
import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise';

import { Config } from '../../application/config/Config';
import {
  PortfolioRepositoryPostgreSQL,
  TokenRepositoryPostgreSQL,
  UserRepositoryPostgreSQL,
  UserAggregatorRepositoryPostgreSQL,
  UserDeviceRepositoryPostgreSQL,
  UserPasswordResetRepositoryPostgreSQL,
  UserVerificationRepositoryPostgreSQL,
  AdminPasswordResetRepositoryPostgreSQL,
  AdminRepositoryPostgreSQL,
} from './repositories';


interface Extensions {
  admin: AdminRepositoryPostgreSQL;
  adminPasswordReset: AdminPasswordResetRepositoryPostgreSQL;
  portfolio: PortfolioRepositoryPostgreSQL;
  token: TokenRepositoryPostgreSQL;
  user: UserRepositoryPostgreSQL;
  userAggregator: UserAggregatorRepositoryPostgreSQL;
  userDevice: UserDeviceRepositoryPostgreSQL;
  userPasswordReset: UserPasswordResetRepositoryPostgreSQL;
  userVerification: UserVerificationRepositoryPostgreSQL;
}

export type IDatabaseExtended = IDatabase<Extensions> & Extensions;

export class RepositoryFactory {
  constructor(private readonly config: Config) {}

  // TODO Create an interface fot it
  create(): { db: IDatabaseExtended; pgp: IMain } {
    const initOptions: IInitOptions<Extensions> = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extend(obj: IDatabaseExtended, dc: any) {
        obj.admin = new AdminRepositoryPostgreSQL(obj, pgp);
        obj.adminPasswordReset = new AdminPasswordResetRepositoryPostgreSQL(obj, pgp);
        obj.portfolio = new PortfolioRepositoryPostgreSQL(obj, pgp);
        obj.token = new TokenRepositoryPostgreSQL(obj, pgp);
        obj.user = new UserRepositoryPostgreSQL(obj, pgp);
        obj.userDevice = new UserDeviceRepositoryPostgreSQL(obj, pgp);
        obj.userPasswordReset = new UserPasswordResetRepositoryPostgreSQL(obj, pgp);
        obj.userVerification = new UserVerificationRepositoryPostgreSQL(obj, pgp);
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
