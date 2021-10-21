import loginUseCase from 'domain/authentication/usecases/login_usecase';
import { FC, useState } from 'react';
import AuthenticationContext from './AuthenticationContext';

const AuthenticationProvider: FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const loginEmailPassword = async (email: string, password: string) => {
    await loginUseCase(email, password);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        loginEmailPassword,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
