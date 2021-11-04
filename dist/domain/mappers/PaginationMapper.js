"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationMapper = void 0;
class PaginationMapper {
    static toJSON(currentPage, totalItems, itemsPerPage) {
        return this.map(currentPage, totalItems, itemsPerPage);
    }
    static map(currentPage, totalItems, itemsPerPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
            itemsPerPage,
            currentPage,
            totalPages,
        };
    }
}
exports.PaginationMapper = PaginationMapper;
//# sourceMappingURL=PaginationMapper.js.map