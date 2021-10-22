import { TEST } from 'config/environment';
import { FC } from 'react';
import AuthenticationAuth0Provider from './providers/AuthenticationAuth0Provider';
import AuthenticationTestProvider from './providers/AuthenticationTestProvider';

const AuthenticationProvider: FC = ({ children }) => {
  if (TEST)
    return <AuthenticationTestProvider>{children}</AuthenticationTestProvider>;

  return <AuthenticationAuth0Provider>{children}</AuthenticationAuth0Provider>;
};

export default AuthenticationProvider;
