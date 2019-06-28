import { Request, Response, RequestHandler } from "express";
import Vehicle from '../models/Vehicle';
import GlobalHelper from '../helpers/globalHelper';
import { Messages } from '../config/languages/messages.MX';


//-- Controlador de la tabla vehicles --//
export default class VehicleController {
  private model: string = "Vehicle";

  /**
   * Función que devuelve todos los registros
   * [12/06/2019] / acuxin
  **/
  public findAll = (req: Request, res: Response) => {
    const columns: Object[] = GlobalHelper.getColumnsTable(this.model);

    Vehicle.getAll().then(vehicles => {
      if(vehicles.length === 0) { res.status(404).json({ args: false, message: Messages.generals.notFound }); }
      res.json([ vehicles, columns ])
    });
  }

  /**
   * Función que devuelve un registro por ID
   * [12/06/2019] / acuxin
  **/
  public findById = (req: Request, res: Response) => {
    Vehicle.getById(req.params.id).then(vehicle => {
      if(!vehicle) { return res.status(404).json({ args: false, message: Messages.generals.notFound }); }
      res.json(vehicle);
    });
  }

  /**
   * Función que inserta un registro
   * [13/06/2019] / acuxin
  **/
  public insert = (req: Request, res: Response) => {
    const params = req.body;
    const vehicle = new Vehicle({
      code: params.code.trim(),
      model_id: params.model,
      company_id: params.company,
      air_conditioner: params.ac
    });
    
    GlobalHelper.insert(vehicle, this.model)
    .then(vehicle => res.json(vehicle))
    .catch(err => res.json(err.errors));
  }

  /**
   * Función que actualiza un registro
   * [14/06/2019] / acuxin
  **/
  public update(req: Request, res: Response) {
    const params = req.body;
    const vehicle = new Vehicle({
      id: params.id,
      code: params.code.trim(),
      model_id: params.model,
      company_id: params.company,
      air_conditioner: params.ac,
      status: params.status
    });
    
    const where = { where: {id: vehicle.id} };
    Vehicle.update(vehicle.toJSON(), where)
    .then(result => {
      if(result[0] !== 1) { return res.status(400).json({ args: false, message: Messages.generals.notUpdated }); }
      return res.json({ args: true, message: Messages.generals.updated });
      //Vehicle.findOne(where).then(vehicle => res.json(vehicle));
    }); 
  }
}