import MigrationParams from './migration_params';
import umzug from './umzug';

const runMigrations = (migrationParams: MigrationParams = { logging: false }) =>
  umzug(migrationParams).up();

export default runMigrations;
