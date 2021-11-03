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
                obj.portfolio = new repositories_1.PortfolioRepositoryPostgreSQL(obj, pgp);
                obj.token = new repositories_1.TokenRepositoryPostgreSQL(obj, pgp);
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