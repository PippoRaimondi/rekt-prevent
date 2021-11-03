"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(repository, hashService, tokenService) {
        this.repository = repository;
        this.hashService = hashService;
        this.tokenService = tokenService;
        this.repository = repository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }
    findByLogin(email) {
        return this.repository.findByLogin(email);
    }
    generateToken(user) {
        const { email } = user;
        return this.tokenService.generate(JSON.stringify({ email }));
    }
    comparePassword(plain, currentPassword) {
        return this.hashService.isEquals(plain, currentPassword);
    }
    generatePassword(password) {
        return this.hashService.hash(password);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map