"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const messages_MX_1 = require("../config/languages/messages.MX");
const Company_1 = __importDefault(require("./Company"));
//-- Declaración de la clase --//
class Vehicle extends sequelize_1.Model {
    //-- Funciones --//
    static getAll() {
        return this.findAll({ include: [Company_1.default] });
    }
    static getById(id) {
        return this.findByPk(id, { include: [Company_1.default] });
    }
}
exports.default = Vehicle;
//-- Inicialización del modelo --/
Vehicle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            noNull(code) {
                if (code.trim().length === 0) {
                    throw new Error(messages_MX_1.Messages.valVehicle.nullCode);
                }
            },
            len: { args: [2, 10], msg: messages_MX_1.Messages.valVehicle.lenCode }
        },
        comment: 'nameCode'
    },
    model_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, comment: 'nameModel' },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Company_1.default, key: 'id' },
        comment: 'nameCompany'
    },
    air_conditioner: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, comment: 'nameAC' },
    status: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1, comment: 'nameStatus' },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE
}, {
    tableName: 'vehicles',
    modelName: 'Vehicle',
    sequelize: db_1.connection
});
//-- Otras configuraciones --//
/* Un vehiculo le pertenece a una compania */
Vehicle.belongsTo(Company_1.default, { foreignKey: 'company_id', targetKey: 'id' });
//# sourceMappingURL=Vehicle.js.map