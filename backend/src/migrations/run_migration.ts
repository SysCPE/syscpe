import path from 'path';
import { Sequelize } from 'sequelize';
import Umzug from 'umzug';

const runMigration = async () => {
  try {
    const sequelize = new Sequelize(
      (process.env.DB_CONNECTION_STRING as string) || ''
    );

    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, '..', 'database/migrations'),
        params: [sequelize.getQueryInterface()],
      },
      storage: 'sequelize',
      storageOptions: {
        sequelize: sequelize,
      },
      logging: console.log,
    });

    await umzug.up();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMigration();
