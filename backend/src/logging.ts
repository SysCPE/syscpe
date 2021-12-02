import { NODE_ENV } from 'config/server';

const logging = {
  testing: (message: any) => {},
  development: (message: any) => console.log(message),
  production: (message: any) => console.log(message),
}[NODE_ENV]!;

export default logging;
