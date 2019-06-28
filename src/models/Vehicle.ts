import { Model, DataTypes } from 'sequelize';
import { connection } from '../config/db';
import { Messages } from "../config/languages/messages.MX";
import Company from './Company';


//-- Declaración de la clase --//
export default class Vehicle extends Model {
  public id!: number;
  public code!: string;
  public model_id!: number;
  public company_id!: number;
  public air_conditioner!: number;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;


  //-- Funciones --//
  static getAll() {
    return this.findAll({ include: [Company] });
  }

  static getById(id: number) {
    return this.findByPk(id, { include: [Company] });
  }
}

//-- Inicialización del modelo --/
Vehicle.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      noNull(code: string) {
        if(code.trim().length === 0) { throw new Error(Messages.valVehicle.nullCode); }
      },
      len: { args: [2, 10], msg: Messages.valVehicle.lenCode }
    },
    comment: 'nameCode'
  },
  model_id: { type: DataTypes.INTEGER, allowNull: false, comment: 'nameModel' },
  company_id: { 
    type: DataTypes.INTEGER,
    allowNull: false ,
    references: { model: Company, key:'id' },
    comment: 'nameCompany'
  },
  air_conditioner: { type: DataTypes.INTEGER, allowNull: false, comment: 'nameAC' },
  status: { type: DataTypes.INTEGER, defaultValue: 1, comment: 'nameStatus' },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
},{
  tableName: 'vehicles',
  modelName: 'Vehicle',
  sequelize: connection
});

//-- Otras configuraciones --//
/* Un vehiculo le pertenece a una compania */
Vehicle.belongsTo(Company, {foreignKey: 'company_id', targetKey: 'id'});