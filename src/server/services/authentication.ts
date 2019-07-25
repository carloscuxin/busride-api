import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

/**
 * Web token valido
 * [17/07/2019] / acuxin 
**/
export const checkJWT = (req: Request, res: Response, next: Function) => {
  const token: string = req.headers.authorization as string;

  jwt.verify(token, process.env.SECRET as string, (error, decode) => {
    if(error) {
      return res.status(401).json({
        args: false,
        error
      });
    }

    next();
  });
};

/**
 * Crea webtoken valido
 * [23/07/2019] / acuxin 
**/
export const getToken = (user: object) => jwt.sign({
  user,
},
process.env.SECRET as string,
{expiresIn: process.env.EXPIRATION_TOKEN});