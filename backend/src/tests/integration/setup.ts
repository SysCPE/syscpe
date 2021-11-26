import runMigrations from 'database/run_migrations';
import sequelize from 'database/sequelize';

const clearDatabase = () => sequelize.truncate({ cascade: true });

beforeEach(async () => {
  await runMigrations();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await sequelize.close();
});
