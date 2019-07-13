"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Labels = __importStar(require("../config/languages"));
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
        let columnsTable = { en: [], es: [], de: [] };
        const languages = Object.keys(columnsTable);
        languages.map(lang => {
            const labels = this.getLabels(lang, labelObject);
            attributesModel.filter(attr => ModelGeneric.rawAttributes[attr].comment).map(attr => {
                columnsTable[lang].push({
                    title: (typeof labels[attr] !== 'object') ? labels[attr] : labels[attr].output,
                    field: (typeof labels[attr] !== 'object') ? attr : labels[attr].reference
                });
            });
        });
        return columnsTable;
    }
    /**
     * Función que devuelve el objeto de labels
     * @param language
     * @param labelObject
    **/
    static getLabels(language, labelObject) {
        switch (language) {
            case 'en': return Labels.LabelsEN[labelObject];
            case 'es': return Labels.LabelsES[labelObject];
            case 'de': return Labels.LabelsDE[labelObject];
            default: return Labels.LabelsES[labelObject];
        }
    }
}
exports.default = GlobalHelper;
//# sourceMappingURL=globalHelper.js.map