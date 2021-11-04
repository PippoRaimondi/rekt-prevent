"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtils = void 0;
const InvalidArgumentError_1 = require("../errors/InvalidArgumentError");
class PaginationUtils {
    static getOffsetByPage(page, itemsPerPage) {
        if (page < 1 || !Number.isInteger(page)) {
            throw new InvalidArgumentError_1.InvalidArgumentError('page should be positive and an integer');
        }
        if (itemsPerPage < 1 || !Number.isInteger(itemsPerPage)) {
            throw new InvalidArgumentError_1.InvalidArgumentError('itemsPerPage  should be positive and an integer');
        }
        return (page - 1) * itemsPerPage;
    }
}
exports.PaginationUtils = PaginationUtils;
//# sourceMappingURL=PaginationUtils.js.map