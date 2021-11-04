"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTemplateRepository = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class MailTemplateRepository {
    constructor() {
        this.TEMPLATE_DIRECTORY = (0, path_1.resolve)(__dirname, `../../interfaces/templates/mail`);
    }
    get(name) {
        const templateFile = (0, fs_1.readFileSync)(`${this.TEMPLATE_DIRECTORY}/${name}.html`, 'utf8');
        return (templateFile
            .replace(/\${copyrightYear}/g, new Date().getFullYear().toString()));
    }
}
exports.MailTemplateRepository = MailTemplateRepository;
//# sourceMappingURL=MailTemplateRepository.js.map