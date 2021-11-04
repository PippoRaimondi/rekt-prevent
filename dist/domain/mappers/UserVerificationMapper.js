"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerificationMapper = void 0;
const UserMapper_1 = require("./UserMapper");
class UserVerificationMapper {
    static map(entity) {
        const { token, user, verifiedAt } = entity;
        return {
            token,
            user: UserMapper_1.UserMapper.map(user),
            verifiedAt: verifiedAt ? verifiedAt : undefined,
        };
    }
}
exports.UserVerificationMapper = UserVerificationMapper;
//# sourceMappingURL=UserVerificationMapper.js.map