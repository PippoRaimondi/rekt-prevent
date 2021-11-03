"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMapper = void 0;
class TokenMapper {
    static toJSON(entity) {
        return this.map(entity);
    }
    static map(entity) {
        const { id, description, chain, price } = entity;
        return {
            id: +id,
            description,
            chain,
            price
        };
    }
}
exports.TokenMapper = TokenMapper;
//# sourceMappingURL=TokenMapper.js.map