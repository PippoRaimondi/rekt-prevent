"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenRequestMapper = void 0;
class CreateTokenRequestMapper {
    static map(request) {
        const { description, chain, price } = request.body;
        return {
            description,
            chain,
            price,
        };
    }
}
exports.CreateTokenRequestMapper = CreateTokenRequestMapper;
//# sourceMappingURL=CreateTokenRequestMapper.js.map