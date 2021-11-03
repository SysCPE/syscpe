import axios from 'axios';
import TokenService from './token_service';

const apiTokenService: TokenService = {
  verifyToken: async () => {
    try {
      await axios.get('/private');
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 401) return false;

      throw error;
    }
  },
};

export default apiTokenService;
