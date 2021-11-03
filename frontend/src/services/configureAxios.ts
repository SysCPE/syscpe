import { GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import axios from 'axios';
import { API_URL } from 'config/api_url';

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

    config.baseURL = API_URL;

    return config;
  });
};

export default configureAxios;
