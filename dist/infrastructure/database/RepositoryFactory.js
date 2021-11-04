"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const pg_monitor_1 = require("pg-monitor");
const pg_promise_1 = __importDefault(require("pg-promise"));
const repositories_1 = require("./repositories");
class RepositoryFactory {
    constructor(config) {
        this.config = config;
    }
    create() {
        const initOptions = {
            extend(obj, dc) {
                obj.admin = new repositories_1.AdminRepositoryPostgreSQL(obj, pgp);
                obj.adminPasswordReset = new repositories_1.AdminPasswordResetRepositoryPostgreSQL(obj, pgp);
                obj.portfolio = new repositories_1.PortfolioRepositoryPostgreSQL(obj, pgp);
                obj.token = new repositories_1.TokenRepositoryPostgreSQL(obj, pgp);
                obj.user = new repositories_1.UserRepositoryPostgreSQL(obj, pgp);
                obj.userDevice = new repositories_1.UserDeviceRepositoryPostgreSQL(obj, pgp);
                obj.userPasswordReset = new repositories_1.UserPasswordResetRepositoryPostgreSQL(obj, pgp);
                obj.userVerification = new repositories_1.UserVerificationRepositoryPostgreSQL(obj, pgp);
            },
        };
        const pgp = (0, pg_promise_1.default)(initOptions);
        if (!['production', 'test'].includes(this.config.environment)) {
            (0, pg_monitor_1.attach)(initOptions);
        }
        const { host, password, username, dbname, port } = this.config.database;
        const db = pgp(`postgres://${username}:${password}@${host}:${port}/${dbname}`);
        return { db, pgp };
    }
}
exports.RepositoryFactory = RepositoryFactory;
//# sourceMappingURL=RepositoryFactory.js.map