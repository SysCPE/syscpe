import loginUseCase from 'domain/authentication/usecases/login_usecase';
import { FC } from 'react';
import AuthenticationContext from './AuthenticationContext';

type Props = {
  loading?: boolean;
  authenticated?: boolean;
  userEmail?: string;
  logout?: () => void;
  loginWithRedirect?: () => Promise<void>;
};
const AuthenticationCore: FC<Props> = ({
  children,
  loading = false,
  authenticated = false,
  userEmail = '',
  logout = () => {},
  loginWithRedirect = async () => {},
}) => {
  const loginEmailPassword = async (email: string, password: string) => {
    await loginUseCase(email, password);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        loading,
        authenticated,
        email: userEmail,
        loginEmailPassword,
        logout,
        loginWithRedirect,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationCore;
