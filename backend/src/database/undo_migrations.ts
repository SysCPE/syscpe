import MigrationParams from './migration_params';
import umzug from './umzug';

const undoMigrations = (
  migrationsParams: MigrationParams = { logging: false }
) => umzug(migrationsParams).down();

export default undoMigrations;
