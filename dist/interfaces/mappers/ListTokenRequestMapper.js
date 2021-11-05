"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTokenRequestMapper = void 0;
class ListTokenRequestMapper {
    static map(request) {
        var _a;
        const page = Number((_a = request.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const filter = this.mapFilter(request.query);
        return {
            page,
            filter,
        };
    }
    static mapFilter(query) {
        const { description, chain } = query;
        return {
            description,
            chain
        };
    }
}
exports.ListTokenRequestMapper = ListTokenRequestMapper;
//# sourceMappingURL=ListTokenRequestMapper.js.map