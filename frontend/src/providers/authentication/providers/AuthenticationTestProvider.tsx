import AuthenticationCore from 'providers/authentication/AuthenticationCore';
import { FC } from 'react';

const AuthenticationTestProvider: FC = ({ children }) => {
  return <AuthenticationCore>{children}</AuthenticationCore>;
};

export default AuthenticationTestProvider;
