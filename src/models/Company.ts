import { Model, DataTypes } from 'sequelize';
import { connection } from '../config/db';
import { Messages } from "../config/languages/messages.MX";
import Vehicle from './Vehicle';

//-- Declaración de la clase --//
export default class Company extends Model {
  public business_name!: string;
  public commercial_name!: string;
  public phone!: string;
  public email!: string;
  public web_page!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  //-- Funciones --//
  static getAll() {
    return this.findAll();
  }
}

//-- Inicialización del modelo --/
Company.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  business_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nameBusiness'
  },
  commercial_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nameCommercial'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'namePhone'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nameEmail'
  },
  web_page :{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    comment: 'namePage'
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
},{
  tableName: 'companies',
  modelName: 'Company',
  sequelize: connection
});

//-- Otras configuraciones --//
/* Una compania tiene varios vehiculos */
//Company.hasMany(Vehicle, {as: 'Vehicle', foreignKey: 'company_id', sourceKey: 'id'});