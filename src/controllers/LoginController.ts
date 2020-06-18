import { Request, Response } from "express";
import User from "../models/User";
import { LoginData } from "interfaces";
//import { Messages } from '../config/languages/messages.MX';
import { validateToken, checkJWT } from '../server/services/authentication';


//-- Controlador de la tabla vehicles --//
export default class LoginController {
  private model: string = "User";

  /**
   * Función que devuelve al usuario logueado
   * [26/06/2019] / acuxin
  **/
  public findUser = (req: Request, res: Response) => {
    User.getUser().then(companies => {
      //if(companies.length === 0) { res.status(404).json({ args: true, message: Messages.generals.notFound }); }
      res.json(companies)
    }).catch(err => res.status(500).json(err));
  };

  /**
   * Función para iniciar sesión
   * [22/07/2019] / acuxin
  **/
  public login = async (req: Request, res: Response) => {
    const request: LoginData = {
      username: req.body.user,
      password: req.body.password
    };
    
    return await User.login(request, req, res);
  };

  /**
   * Función para checar si esta autenticado y es valido el token
   * [27/07/2019] / acuxin  
  **/
  public isAuthenticated = (req: Request, res: Response) => {
    const token: string = req.headers.authorization as string;
    if (token === "undefined") return res.send(false);

    const isValidToken = validateToken(token);
    
    return (isValidToken) ? res.send(true) : res.send(false);
  };

  public post = (req: Request, res: Response) => {
    const tag: string = req.body.message;
    console.log(tag);
  };
}