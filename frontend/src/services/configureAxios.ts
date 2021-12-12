import { GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import axios from 'axios';

const configureAxios = (
  getTokenSilently?: (
    options?: GetTokenSilentlyOptions | undefined
  ) => Promise<string>
) => {
  axios.interceptors.request.use(async (config) => {
    if (getTokenSilently) {
      const token = await getTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export default configureAxios;
