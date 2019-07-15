import { Sequelize } from "sequelize";

const db: string = process.env.DB as string;
const user: string = process.env.DB_USER as string;
const pasword: string = process.env.DB_PASSWORD as string;

export const connection = new Sequelize(db, user, pasword, {
  host: process.env.DB_HOST as string,
  dialect: 'mysql',
  port: parseInt(process.env.PORT as string) || 3306,
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