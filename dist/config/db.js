"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let db = 'busride';
let user = 'busride.user';
let pasword = '123456';
exports.connection = new sequelize_1.Sequelize(db, user, pasword, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    logging: false
});
exports.connection.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=db.js.map