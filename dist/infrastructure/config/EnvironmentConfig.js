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
        apiKeys: {
            internal: process.env.API_KEY_INTERNAL || '',
        },
    };
};
exports.parseConfigFromEnvironment = parseConfigFromEnvironment;
//# sourceMappingURL=EnvironmentConfig.js.map