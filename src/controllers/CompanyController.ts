import { Request, Response, RequestHandler } from "express";
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
    const columns: Object[] = GlobalHelper.getColumnsTable(this.model);

    Company.getAll().then(companies => {
      if(companies.length === 0) { res.status(404).json({ args: false, message: Messages.generals.notFound }); }
      res.json([ companies, columns ])
    });
  }
}