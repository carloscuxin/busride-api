"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
//-- Declaración de la clase --//
class Company extends sequelize_1.Model {
    //-- Funciones --//
    static getAll() {
        return this.findAll();
    }
}
exports.default = Company;
//-- Inicialización del modelo --/
Company.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    business_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'nameBusiness'
    },
    comertial_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'nameComertial'
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'namePhone'
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'nameEmail'
    },
    web_page: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'namePage'
    },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE
}, {
    tableName: 'companies',
    modelName: 'Company',
    sequelize: db_1.connection
});
//-- Otras configuraciones --//
/* Una compania tiene varios vehiculos */
//Company.hasMany(Vehicle, {as: 'Vehicle', foreignKey: 'company_id', sourceKey: 'id'});
//# sourceMappingURL=Company.js.map