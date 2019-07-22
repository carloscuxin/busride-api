"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const messages_MX_1 = require("../config/languages/messages.MX");
//-- Declaración de la clase --//
class User extends sequelize_1.Model {
    //-- Funciones --//
    static findUser() {
        return this.findAll();
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findOne({ where: { username: data.username } });
                if (!user)
                    return { args: false, status: 400, message: messages_MX_1.Messages.valLogin.logError };
                if (user.password !== data.password)
                    return { args: false, status: 400, message: messages_MX_1.Messages.valLogin.logError };
                return user;
            }
            catch (error) {
                return { args: false, message: `Error interno: ${error}` };
            }
        });
    }
}
exports.default = User;
//-- Inicialización del modelo --/
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'nameUser'
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'namePassword'
    },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE
}, {
    tableName: 'users',
    modelName: 'User',
    sequelize: db_1.connection,
});
//# sourceMappingURL=User.js.map