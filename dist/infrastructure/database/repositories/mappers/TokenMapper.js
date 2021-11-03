"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMapper = void 0;
class TokenMapper {
    static mapFromDatabase(record, prefix = '') {
        return {
            id: +record[`${prefix}id`],
            description: record[`${prefix}token_desc`],
            chain: record[`${prefix}chain`],
            price: record[`${prefix}initial_price`],
        };
    }
    static mapToDatabase(entity) {
        return Object.assign({}, entity);
    }
}
exports.TokenMapper = TokenMapper;
//# sourceMappingURL=TokenMapper.js.map