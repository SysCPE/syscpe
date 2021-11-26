import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from 'config/server';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
});

export default sequelize;
