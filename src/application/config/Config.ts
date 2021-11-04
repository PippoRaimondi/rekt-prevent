export type RecaptchaConfig = {
  siteKey: string;
  secretKey: string;
};

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
    mailer: {
      fromAddress: string;
      apiKey: string;
    };
    apiKeys: {
      internal: string;
    };
    recaptcha: {
      admin: RecaptchaConfig;
      app: RecaptchaConfig;
      organization: RecaptchaConfig;
    };
  }
  