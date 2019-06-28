"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../models/Company"));
const globalHelper_1 = __importDefault(require("../helpers/globalHelper"));
const messages_MX_1 = require("../config/languages/messages.MX");
//-- Controlador de la tabla vehicles --//
class CompanyController {
    constructor() {
        this.model = "Company";
        /**
         * Función que devuelve todos los registros
         * [26/06/2019] / acuxin
        **/
        this.findAll = (req, res) => {
            const columns = globalHelper_1.default.getColumnsTable(this.model);
            Company_1.default.getAll().then(companies => {
                if (companies.length === 0) {
                    res.status(404).json({ args: false, message: messages_MX_1.Messages.generals.notFound });
                }
                res.json([companies, columns]);
            });
        };
    }
}
exports.default = CompanyController;
//# sourceMappingURL=CompanyController.js.map