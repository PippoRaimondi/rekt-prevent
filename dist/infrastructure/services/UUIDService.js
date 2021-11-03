"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDService = void 0;
const uuid_1 = require("uuid");
class UUIDService {
    create() {
        return (0, uuid_1.v1)().toString();
    }
}
exports.UUIDService = UUIDService;
//# sourceMappingURL=UUIDService.js.map