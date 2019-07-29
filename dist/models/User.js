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
const typeErrors_1 = require("../config/typeErrors");
const authentication_1 = require("../server/services/authentication");
//-- Declaración de la clase --//
class User extends sequelize_1.Model {
    //-- Funciones --//
    static getUser() {
        return this.findAll();
    }
    ;
    static login(data, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const badRequest = typeErrors_1.typesErrors.badRequest;
            const internalServer = typeErrors_1.typesErrors.internalServer;
            try {
                const searchUser = yield this.findOne({ where: { username: data.username } });
                const logError = { args: false, type: badRequest };
                if (!searchUser)
                    return res.status(400).json(logError);
                if (searchUser.password !== data.password)
                    return res.status(400).json(logError);
                const token = authentication_1.getToken(searchUser);
                const user = { username: searchUser.username };
                return res.json({ user, token });
            }
            catch (error) {
                return res.status(500).json({ args: false, type: internalServer, message: error });
            }
        });
    }
    ;
}
exports.default = User;
;
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