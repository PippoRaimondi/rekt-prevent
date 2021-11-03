"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioMapper = void 0;
class PortfolioMapper {
    static mapFromDatabase(record, prefix = '') {
        return {
            id: +record[`${prefix}id`],
            name: record[`${prefix}name`],
            user_id: record[`${prefix}user_id`],
        };
    }
    static mapToDatabase(entity) {
        return Object.assign({}, entity);
    }
}
exports.PortfolioMapper = PortfolioMapper;
//# sourceMappingURL=PortfolioMapper.js.map