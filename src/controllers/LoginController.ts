import { Request, Response } from "express";
import User from '../models/User';
//import { Messages } from '../config/languages/messages.MX';


//-- Controlador de la tabla vehicles --//
export default class LoginController {
  private model: string = "User";

  /**
   * Función que devuelve al usuario logueado
   * [26/06/2019] / acuxin
  **/
  public findUser = (req: Request, res: Response) => {
    User.findUser().then(companies => {
      //if(companies.length === 0) { res.status(404).json({ args: true, message: Messages.generals.notFound }); }
      res.json(companies)
    }).catch(err => res.status(500).json(err));
  };


  /**
   * Función para iniciar sesión
   * [22/07/2019] / acuxin  
  **/
  public login = async (req: Request, res: Response) => {
    const request: object = {
      username: req.body.user,
      password: req.body.password
    };
    
    const user = await User.login(request);
    return res.json(user);
  };
}