import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
//Own components
import { UserInterface } from 'interfaces'; 

/**
 * Web token valido
 * [17/07/2019] / acuxin 
**/
export const checkJWT = (req: Request, res: Response, next: Function) => {
  const token: string = revertToken(req.headers.authorization as string);

  jwt.verify(token, process.env.SECRET as string, (error, decode: any) => {
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
 * Valida token
 * [26/07/2019] / acuxin 
**/
export const validateToken = (token: string) => {
  try {
    jwt.verify(revertToken(token), process.env.SECRET as string);
    return true;
  } catch(err) {
    return false;
  }
};

/**
 * Crea webtoken valido
 * [23/07/2019] / acuxin 
**/
export const getToken = (user: UserInterface) => {
  const token = jwt.sign({
    user: {
      username: user.username
    },
  },
  process.env.SECRET as string,
  {expiresIn: process.env.EXPIRATION_TOKEN});
  return transformToken(token);
};

/**
 * Transforma y revierte los token
 * [27/07/2019] / acuxin 
**/
export const transformToken = (token: string) => token.split('.').join('=');
export const revertToken = (token: string) => token.split('=').join('.');