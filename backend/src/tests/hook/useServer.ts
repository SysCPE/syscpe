import bootstrap from 'bootstrap';
import { Server } from 'http';
import useDatabase from './useDatabase';

const useServer = () => {
  useDatabase();

  let server: Server;

  beforeAll(async () => {
    const app = await bootstrap();
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  return () => server;
};

export default useServer;
