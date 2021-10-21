import { createContext } from 'react';

type AuthenticationContextType = {
  authenticated: boolean;
  loginEmailPassword: (email: string, password: string) => Promise<void>;
};
const AuthenticationContext = createContext<AuthenticationContextType>({
  authenticated: false,
  loginEmailPassword: async () => {},
});

export default AuthenticationContext;
