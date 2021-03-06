import bootstrap from './bootstrap';
import { SERVER_PORT } from './config/server';

const main = async () => {
  const app = await bootstrap();

  app.listen(SERVER_PORT, () => {
    console.log(`Server started at port ${SERVER_PORT}...`);
  });
};

main();
