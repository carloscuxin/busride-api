"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = process.env.DB;
const user = process.env.DB_USER;
const pasword = process.env.DB_PASSWORD;
exports.connection = new sequelize_1.Sequelize(db, user, pasword, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT) || 3306,
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