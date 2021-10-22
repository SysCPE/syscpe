import { createContext } from 'react';

type AuthenticationContextType = {
  authenticated: boolean;
  email?: string;
  loginEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
const AuthenticationContext = createContext<AuthenticationContextType>({
  authenticated: false,
  loginEmailPassword: async () => {},
  logout: () => {},
});

export default AuthenticationContext;
