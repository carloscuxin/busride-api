import { Model } from 'sequelize';
import * as Labels from '../config/languages';
import Vehicle from '../models/Vehicle';
import Company from '../models/Company';


//--  Helper global --//
export default class GlobalHelper {
  /**
   * Función que retorna el modelo correspondiente
   * [17/06/2019] / acuxin 
   * @param model 
  **/
  private static getModel(model: string): any {
    switch (model) {
      case 'Vehicle':
        return Vehicle;
      case 'Company':
        return Company;
    }
  }

  /**
   * Función que retorna la etiqueta del objeto
   * [26/06/2019] / acuxin 
   * @param model
   * @param type
  **/
  private static getLabelObject(model: string, type: string): string {
    var labelObjetc: string;
    switch (type) {
      case 'columnsTable':
        return `${model}Columns`;
      default:
        return "undefined";
    };
  }

  /**
   * Función que inserta un registro en la tabla correspondiente 
   * [17/06/2019] / acuxin
   * @param req 
   * @param model 
  **/
  static async insert(req: Model, model: string) {
    const ModelGeneric = this.getModel(model);
    return await ModelGeneric.create(req.toJSON());
  }

  /**
   * Función que actualiza un registro en la tabla correspondiente 
   * [17/06/2019] / acuxin
   * @param req 
   * @param model 
  **/
  static async update(req: Model, model: string) {
    const ModelGeneric = this.getModel(model);
    return await ModelGeneric.update(req.toJSON());
  }

  /**
   * Función que devuleve un arreglo de objetos de las columnas de una tabla
   * [26/06/2019] / acuxin
   * @param model 
  **/
  static getColumnsTable(model: string): object {
    const ModelGeneric = this.getModel(model);
    const attributesModel = Object.keys(ModelGeneric.rawAttributes);
    const labelObject: string  = this.getLabelObject(model, 'columnsTable');
    let columnsTable: any = {en: [], es: [], de: []};
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
  private static getLabels(language: string, labelObject: string) {
    switch (language) {
      case 'en': return Labels.LabelsEN[labelObject];
      case 'es': return Labels.LabelsES[labelObject];
      case 'de': return Labels.LabelsDE[labelObject];
      default: return Labels.LabelsES[labelObject];
    }
  }
}