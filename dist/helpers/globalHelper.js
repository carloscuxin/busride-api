"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const labels_MX_1 = require("../config/languages/labels.MX");
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const Company_1 = __importDefault(require("../models/Company"));
//--  Helper global --//
class GlobalHelper {
    /**
     * Función que retorna el modelo correspondiente
     * [17/06/2019] / acuxin
     * @param model
    **/
    static getModel(model) {
        switch (model) {
            case 'Vehicle':
                return Vehicle_1.default;
            case 'Company':
                return Company_1.default;
        }
    }
    /**
     * Función que retorna la etiqueta del objeto
     * [26/06/2019] / acuxin
     * @param model
     * @param type
    **/
    static getLabelObject(model, type) {
        var labelObjetc;
        switch (type) {
            case 'columnsTable':
                return `${model}Columns`;
            default:
                return "undefined";
        }
        ;
    }
    /**
     * Función que inserta un registro en la tabla correspondiente
     * [17/06/2019] / acuxin
     * @param req
     * @param model
    **/
    static insert(req, model) {
        return __awaiter(this, void 0, void 0, function* () {
            const ModelGeneric = this.getModel(model);
            return yield ModelGeneric.create(req.toJSON());
        });
    }
    /**
     * Función que actualiza un registro en la tabla correspondiente
     * [17/06/2019] / acuxin
     * @param req
     * @param model
    **/
    static update(req, model) {
        return __awaiter(this, void 0, void 0, function* () {
            const ModelGeneric = this.getModel(model);
            return yield ModelGeneric.update(req.toJSON());
        });
    }
    /**
     * Función que devuleve un arreglo de objetos de las columnas de una tabla
     * [26/06/2019] / acuxin
     * @param model
    **/
    static getColumnsTable(model) {
        const ModelGeneric = this.getModel(model);
        const attributesModel = Object.keys(ModelGeneric.rawAttributes);
        const labelObject = this.getLabelObject(model, 'columnsTable');
        let columnsTable = [];
        attributesModel.filter(attr => ModelGeneric.rawAttributes[attr].comment).map(attr => {
            const object = labels_MX_1.Labels[labelObject];
            columnsTable.push({
                title: (typeof object[attr] !== 'object') ? object[attr] : object[attr].output,
                field: (typeof object[attr] !== 'object') ? attr : object[attr].reference
            });
        });
        return columnsTable;
    }
}
exports.default = GlobalHelper;
//# sourceMappingURL=globalHelper.js.map