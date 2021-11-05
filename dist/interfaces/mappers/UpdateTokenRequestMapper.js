"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenRequestMapper = void 0;
class UpdateTokenRequestMapper {
    static map(request) {
        const { description, chain, price } = request.body;
        return {
            description,
            chain,
            price,
        };
    }
}
exports.UpdateTokenRequestMapper = UpdateTokenRequestMapper;
//# sourceMappingURL=UpdateTokenRequestMapper.js.map