export const NODE_ENV = process.env.NODE_ENV || 'development';

export const SERVER_PORT = process.env.PORT || 4000;

export const DB_DATABASE = process.env.DB_DATABASE || 'dev-postgres';
export const DB_USER = process.env.DB_USER || 'dev-user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'dev-password';
export const DB_HOST = process.env.DB_HOST || 'db';
export const DB_PORT: number = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT)
  : 5432;

export const DB_LOGGING = process.env.DB_LOGGING ? undefined : false;
