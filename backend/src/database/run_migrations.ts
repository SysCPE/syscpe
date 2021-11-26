import path from 'path';
import Umzug from 'umzug';
import sequelize from './sequelize';

type RunMigrationsParams = {
  logging?: boolean | Function;
};
const runMigrations = async (
  { logging }: RunMigrationsParams = { logging: false }
) => {
  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, 'migrations'),
      params: [sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
    logging,
  });

  await umzug.up();
};

export default runMigrations;
