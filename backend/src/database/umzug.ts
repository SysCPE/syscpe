import path from 'path';
import Umzug from 'umzug';
import MigrationParams from './migration_params';
import sequelize from './sequelize';

const umzug = ({ logging }: MigrationParams = { logging: false }) =>
  new Umzug({
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

export default umzug;
