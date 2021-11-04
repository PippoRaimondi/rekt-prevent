"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserRequestMapper = void 0;
const ListUserRequest_1 = require("../../domain/interfaces/admin/ListUserRequest");
class ListUserRequestMapper {
    static map(request) {
        var _a;
        const page = Number((_a = request.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const orderBy = this.mapOrderBy(request.query);
        const filter = this.mapFilter(request.query);
        return {
            page,
            filter,
            orderBy,
        };
    }
    static mapOrderBy(query) {
        var _a;
        const { orderBy } = query;
        let sort;
        switch (orderBy === null || orderBy === void 0 ? void 0 : orderBy.sort) {
            case 'NAME': {
                sort = ListUserRequest_1.SortBy.NAME;
                break;
            }
            case 'CREATED_AT':
            default: {
                sort = ListUserRequest_1.SortBy.CREATED_AT;
                break;
            }
        }
        return {
            sort,
            direction: ((_a = orderBy === null || orderBy === void 0 ? void 0 : orderBy.direction) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'ASC',
        };
    }
    static mapFilter(query) {
        const { name, email } = query;
        return {
            name,
            email,
        };
    }
}
exports.ListUserRequestMapper = ListUserRequestMapper;
//# sourceMappingURL=ListUserRequestMapper.js.map