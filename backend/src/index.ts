import koa from 'koa';
import { Sequelize } from 'sequelize';


const main = async () => {
    const app = new koa();
    const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING as string || '');

    sequelize.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch((error) => console.error('Unable to connect to the database:', error));

    app.use(async (ctx) => {
        ctx.response.body = 'Hello';
    });

    app.listen(3000);

    console.log('Server started at port 3000');
};

main();