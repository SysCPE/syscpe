import koa from 'koa';
import { Sequelize } from 'sequelize';

function testDatabase() {
    const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING as string || '');

    sequelize.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch((error) => console.error('Unable to connect to the database:', error));

}

const main = async () => {
    const app = new koa();

    if (process.env.DB_CONNECTION_STRING) testDatabase()
    
    app.use(async (ctx) => {
        console.log(ctx);
        ctx.response.body = 'Hello';
    });

    app.listen(3000);

    console.log('Server started at port 3000');
};

main();