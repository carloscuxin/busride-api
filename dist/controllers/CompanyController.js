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
            Company_1.default.getAll().then(companies => {
                if (companies.length === 0) {
                    res.status(404).json({ args: true, message: messages_MX_1.Messages.generals.notFound });
                }
                res.json(companies);
            }).catch(err => res.status(500).json(err));
        };
        /**
         * Función que inserta un registro
         * [11/07/2019] / acuxin
        **/
        this.insert = (req, res) => {
            const params = req.body;
            const company = new Company_1.default({
                business_name: params.business_name,
                commercial_name: params.commercial_name,
                phone: params.phone,
                email: params.email,
                web_page: params.web_page
            });
            globalHelper_1.default.insert(company, this.model)
                .then(company => res.json(company))
                .catch(err => res.status(500).json(err.errors));
        };
        /**
         * Función que devuelve las columnas de la tabla
         * [05/07/2019] / acuxin
        **/
        this.getColumns = (req, res) => {
            const columns = globalHelper_1.default.getColumnsTable(this.model);
            res.json(columns);
        };
    }
}
exports.default = CompanyController;
//# sourceMappingURL=CompanyController.js.map