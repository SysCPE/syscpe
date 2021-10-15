import koa from 'koa';
import path from 'path';
import { Sequelize } from 'sequelize';
import Umzug from 'umzug';

const boostrap = async ({ CONNECT_TO_DB = false }) => {
  const app = new koa();
  const db = CONNECT_TO_DB ? await connectDatabase() : null;

  app.use(async (ctx) => {
    console.log(ctx);
    ctx.response.body = 'Hello';
  });

  return app;
};

const connectDatabase = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(
    (process.env.DB_CONNECTION_STRING as string) || ''
  );

  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, 'database/migrations'),
      params: [sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
    logging: console.log,
  });

  await umzug.up();

  return sequelize;
};

export default boostrap;
