import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

const useAuthentication = () => {
  const { loading, authenticated, email, loginEmailPassword, logout } =
    useContext(AuthenticationContext);

  return { loading, authenticated, email, loginEmailPassword, logout };
};

export default useAuthentication;
