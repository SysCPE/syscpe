import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export default useAuthentication;
