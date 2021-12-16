import runMigrations from './database/run_migrations';

const runner = async () => {
  try {
    await runMigrations();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runner();
