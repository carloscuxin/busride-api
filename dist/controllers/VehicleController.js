"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const globalHelper_1 = __importDefault(require("../helpers/globalHelper"));
const messages_MX_1 = require("../config/languages/messages.MX");
//-- Controlador de la tabla vehicles --//
class VehicleController {
    constructor() {
        this.model = "Vehicle";
        /**
         * Función que devuelve todos los registros
         * [12/06/2019] / acuxin
        **/
        this.findAll = (req, res) => {
            Vehicle_1.default.getAll().then(vehicles => {
                if (vehicles.length === 0) {
                    res.status(404).json({ args: true, message: messages_MX_1.Messages.generals.notFound });
                }
                res.json(vehicles);
            }).catch(err => res.status(500).json(err));
        };
        /**
         * Función que devuelve un registro por ID
         * [12/06/2019] / acuxin
        **/
        this.findById = (req, res) => {
            Vehicle_1.default.getById(req.params.id).then(vehicle => {
                if (!vehicle) {
                    return res.status(404).json({ args: false, message: messages_MX_1.Messages.generals.notFound });
                }
                res.json(vehicle);
            });
        };
        /**
         * Función que inserta un registro
         * [13/06/2019] / acuxin
        **/
        this.insert = (req, res) => {
            const params = req.body;
            const vehicle = new Vehicle_1.default({
                code: params.code.trim(),
                model_id: params.model,
                company_id: params.company,
                air_conditioner: params.ac
            });
            globalHelper_1.default.insert(vehicle, this.model)
                .then(vehicle => res.json(vehicle))
                .catch(err => res.json(err.errors));
        };
        /**
         * Función que devuelve las columnas de la tabla
         * [28/06/2019] / acuxin
        **/
        this.getColumns = (req, res, next) => {
            const columns = globalHelper_1.default.getColumnsTable(this.model);
            res.json(columns);
            next();
        };
    }
    /**
     * Función que actualiza un registro
     * [14/06/2019] / acuxin
    **/
    update(req, res) {
        const params = req.body;
        const vehicle = new Vehicle_1.default({
            id: params.id,
            code: params.code.trim(),
            model_id: params.model,
            company_id: params.company,
            air_conditioner: params.ac,
            status: params.status
        });
        const where = { where: { id: vehicle.id } };
        Vehicle_1.default.update(vehicle.toJSON(), where)
            .then(result => {
            if (result[0] !== 1) {
                return res.status(400).json({ args: false, message: messages_MX_1.Messages.generals.notUpdated });
            }
            return res.json({ args: true, message: messages_MX_1.Messages.generals.updated });
            //Vehicle.findOne(where).then(vehicle => res.json(vehicle));
        });
    }
}
exports.default = VehicleController;
//# sourceMappingURL=VehicleController.js.map