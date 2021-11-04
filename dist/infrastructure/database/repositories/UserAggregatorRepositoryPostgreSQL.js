"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAggregatorRepositoryPostgreSQL = void 0;
class UserAggregatorRepositoryPostgreSQL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    async findById(id) {
        const [user, devices] = await this.db.task((t) => {
            return Promise.all([
                t.user.findById(id),
                t.userDevice.findAllByUserId(id),
            ]);
        });
        return Object.assign(Object.assign({}, user), { devices });
    }
}
exports.UserAggregatorRepositoryPostgreSQL = UserAggregatorRepositoryPostgreSQL;
//# sourceMappingURL=UserAggregatorRepositoryPostgreSQL.js.map