import { Sequelize } from "sequelize";

let db: string = 'busride';
let user: string = 'busride_user';
let pasword: string = 'Busr1d3bd.'; 

export const connection = new Sequelize(db, user, pasword, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  logging: false
});

connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});