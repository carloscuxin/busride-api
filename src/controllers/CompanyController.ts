import { Request, Response } from "express";
import Company from '../models/Company';
import GlobalHelper from '../helpers/globalHelper';
import { Messages } from '../config/languages/messages.MX';


//-- Controlador de la tabla vehicles --//
export default class CompanyController {
  private model: string = "Company";

  /**
   * Función que devuelve todos los registros
   * [26/06/2019] / acuxin
  **/
  public findAll = (req: Request, res: Response) => {
    Company.getAll().then(companies => {
      if(companies.length === 0) { res.status(404).json({ args: true, message: Messages.generals.notFound }); }
      res.json(companies)
    }).catch(err => res.status(500).json(err));
  };

  /**
   * Función que inserta un registro
   * [11/07/2019] / acuxin
  **/
  public insert = (req: Request, res: Response) => {
    const params = req.body;
    const company = new Company({
      business_name: params.business_name,
      commercial_name: params.commercial_name,
      phone: params.phone,
      email: params.email,
      web_page: params.web_page
    });
    
    GlobalHelper.insert(company, this.model)
    .then(company => res.json(company))
    .catch(err => res.status(500).json(err.errors));
  };

  /**
   * Función que devuelve las columnas de la tabla
   * [05/07/2019] / acuxin
  **/
  public getColumns = (req: Request, res: Response) => {
    const columns: Object = GlobalHelper.getColumnsTable(this.model);
    res.json(columns);
  };
}