  export interface Config {
    environment: 'local' | 'staging' | 'production' | 'test';
    adminUrl: string;
    appUrl: string;
    database: {
      host: string;
      dbname: string;
      username: string;
      password: string;
      port: number;
    };
    jwt: {
      adminSecret: string;
      userSecret: string;
    };
    apiKeys: {
      internal: string;
    };
  }
  