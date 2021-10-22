import loginUseCase from 'domain/authentication/usecases/login_usecase';
import { FC } from 'react';
import AuthenticationContext from './AuthenticationContext';

type Props = {
  loading?: boolean;
  authenticated?: boolean;
  userEmail?: string;
  logout?: () => void;
};
const AuthenticationCore: FC<Props> = ({
  children,
  loading = false,
  authenticated = false,
  userEmail = '',
  logout = () => {},
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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationCore;
