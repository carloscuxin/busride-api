import { Request, Response } from "express";
import { Model, DataTypes } from 'sequelize';
//Own components
import { LoginData, UserInterface } from "interfaces";
import { connection } from '../config/db';
import { typesErrors } from "../config/typeErrors";
import { getToken } from '../server/services/authentication';

//-- Declaración de la clase --//
export default class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  //-- Funciones --//
  static getUser() {
    return this.findAll();
  };

  static async login(data: LoginData, req: Request, res: Response) {
    const badRequest = typesErrors.badRequest;
    const internalServer = typesErrors.internalServer;

    try {
      const searchUser = await this.findOne({where: {username: data.username }});
      const logError: object = {args: false, type: badRequest};

      if (!searchUser) return res.status(400).json(logError);
      if (searchUser.password !== data.password) return res.status(400).json(logError);

      const token = getToken(searchUser);
      const user: UserInterface = {username: searchUser.username};
      return res.json({user, token});
    }
    catch(error) { return res.status(500).json({args: false, type: internalServer, message: error}); }
  };
};

//-- Inicialización del modelo --/
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nameUser'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'namePassword'
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
},{
  tableName: 'users',
  modelName: 'User',
  sequelize: connection,
});
