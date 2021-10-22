import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

const useAuthentication = () => {
  const { authenticated, email, loginEmailPassword, logout } = useContext(
    AuthenticationContext
  );

  return { authenticated, email, loginEmailPassword, logout };
};

export default useAuthentication;
