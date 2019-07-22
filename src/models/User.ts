import { Model, DataTypes } from 'sequelize';
import { connection } from '../config/db';
import { Messages } from "../config/languages/messages.MX";

//-- Declaración de la clase --//
export default class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  //-- Funciones --//
  static findUser() {
    return this.findAll();
  }

  static async login(data: any) {
    try {
      const user = await this.findOne({where: {username: data.username }});
      if (!user) return {args: false, status: 400, message: Messages.valLogin.logError };
      if (user.password !== data.password) return {args: false, status: 400, message: Messages.valLogin.logError };

      return user;
    }
    catch(error) { return {args: false, message: `Error interno: ${error}` }; }
  }
}

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
