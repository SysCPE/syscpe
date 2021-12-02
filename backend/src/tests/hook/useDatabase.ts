import runMigrations from 'database/run_migrations';
import sequelize from 'database/sequelize';

const useDatabase = () => {
  beforeEach(async () => {
    await runMigrations();
  });

  afterEach(async () => {
    await sequelize.dropAllSchemas({});

    for (const model in sequelize.models)
      await sequelize.models[model].drop({ cascade: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};

export default useDatabase;
