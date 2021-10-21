import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

const useAuthentication = () => {
  const { authenticated, loginEmailPassword } = useContext(
    AuthenticationContext
  );

  return { authenticated, loginEmailPassword };
};

export default useAuthentication;
