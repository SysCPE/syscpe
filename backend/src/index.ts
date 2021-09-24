import koa from 'koa';

const main = () => {
  const app = new koa();

  app.use(async (ctx) => {
    ctx.response.body = 'Hello';
  });

  app.listen(3000);

  console.log('Server started at port 3000');
};

main();
