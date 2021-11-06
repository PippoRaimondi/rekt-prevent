"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const date_fns_1 = require("date-fns");
const ValidationError_1 = require("../../application/errors/ValidationError");
const AdminMapper_1 = require("../../domain/mappers/AdminMapper");
class AdminService {
    constructor(resetPasswordValidator, repository, passwordResetRepository, authService, mailer, uniqueIdentifierService) {
        this.EXPIRES_IN_MINUTES = 1440;
        this.resetPasswordValidator = resetPasswordValidator;
        this.repository = repository;
        this.passwordResetRepository = passwordResetRepository;
        this.authService = authService;
        this.mailer = mailer;
        this.uniqueIdentifierService = uniqueIdentifierService;
    }
    async get(id) {
        const admin = await this.repository.findById(id);
        return AdminMapper_1.AdminMapper.map(admin);
    }
    async generateToken(entity) {
        const token = this.authService.generateToken(entity);
        return {
            token,
            admin: AdminMapper_1.AdminMapper.map(entity),
        };
    }
    async resetPassword(request) {
        this.resetPasswordValidator.validate(request);
        const { loggedUser, password } = request;
        const newPassword = await this.authService.generatePassword(password);
        const admin = Object.assign(Object.assign({}, loggedUser), { password: newPassword });
        await this.repository.update(admin);
        return AdminMapper_1.AdminMapper.map(admin);
    }
    async forgotPassword(email) {
        const admin = await this.repository.findByEmail(email);
        const token = this.uniqueIdentifierService.create();
        const expiresAt = (0, date_fns_1.addMinutes)(new Date(), this.EXPIRES_IN_MINUTES);
        await this.passwordResetRepository.create({
            token,
            adminId: admin.id,
            expiresAt,
            verifiedAt: null,
        });
        const { name } = admin;
        const expiresAtFormatted = (0, date_fns_1.format)(expiresAt, 'dd/MM/yyyy HH:mm');
        await this.mailer.forgotPassword(name, email, token, expiresAtFormatted);
    }
    async validateForgotPasswordToken(token) {
        const passwordReset = await this.passwordResetRepository.findByToken(token);
        if (this.isPasswordResetExpired(passwordReset) || passwordReset.verifiedAt) {
            throw new ValidationError_1.ValidationError('O link já expirou.');
        }
        await this.passwordResetRepository.updateVerifiedAt(Object.assign(Object.assign({}, passwordReset), { verifiedAt: new Date() }));
        const { admin } = passwordReset;
        const authToken = this.authService.generateToken(admin);
        return {
            token: authToken,
            admin: AdminMapper_1.AdminMapper.map(admin),
        };
    }
    async create(request) {
        const { email, name, password } = request;
        const encodedPassword = await this.authService.generatePassword(password);
        const admin = await this.repository.create({
            name,
            email,
            password: encodedPassword,
        });
        return AdminMapper_1.AdminMapper.map(admin);
    }
    async list() {
        const [admins] = await this.repository.findAll();
        return {
            users: admins.map((admin) => AdminMapper_1.AdminMapper.map(admin)),
        };
    }
    isPasswordResetExpired(passwordReset) {
        const { expiresAt } = passwordReset;
        const now = new Date();
        return now.getTime() > expiresAt.getTime();
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map