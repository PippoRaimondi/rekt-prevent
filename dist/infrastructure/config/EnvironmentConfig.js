"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfigFromEnvironment = void 0;
const parseConfigFromEnvironment = () => {
    let environment;
    switch (process.env.ENVIRONMENT) {
        case 'staging':
            environment = 'staging';
            break;
        case 'production':
            environment = 'production';
            break;
        case 'test':
            environment = 'test';
            break;
        default:
            environment = 'local';
            break;
    }
    return {
        environment,
        adminUrl: process.env.ADMIN_URL || '',
        appUrl: process.env.APP_URL || '',
        database: {
            host: process.env.DB_HOST || '',
            dbname: process.env.DB_NAME || '',
            username: process.env.DB_USER || '',
            password: process.env.DB_PWD || '',
            port: Number(process.env.DB_PORT || 5432),
        },
        jwt: {
            adminSecret: process.env.JWT_ADMIN_SECRET || '',
            userSecret: process.env.JWT_USER_SECRET || '',
        },
        mailer: {
            apiKey: process.env.MAILER_API_KEY || '',
            fromAddress: process.env.MAILER_FROM_ADDRESS || '',
        },
        apiKeys: {
            internal: process.env.API_KEY_INTERNAL || '',
        },
        recaptcha: {
            admin: {
                siteKey: process.env.RECAPTCHA_ADMIN_SITE_KEY || '',
                secretKey: process.env.RECAPTCHA_ADMIN_SECRET_KEY || '',
            },
            app: {
                siteKey: process.env.RECAPTCHA_APP_SITE_KEY || '',
                secretKey: process.env.RECAPTCHA_APP_SECRET_KEY || '',
            },
            organization: {
                siteKey: process.env.RECAPTCHA_ORGANIZATION_SITE_KEY || '',
                secretKey: process.env.RECAPTCHA_ORGANIZATION_SECRET_KEY || '',
            },
        },
    };
};
exports.parseConfigFromEnvironment = parseConfigFromEnvironment;
//# sourceMappingURL=EnvironmentConfig.js.map