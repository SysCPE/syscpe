import { createContext } from 'react';

type AuthenticationContextType = {
  loading: boolean;
  authenticated: boolean;
  email?: string;
  loginEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
const AuthenticationContext = createContext<AuthenticationContextType>({
  loading: false,
  authenticated: false,
  loginEmailPassword: async () => {},
  logout: () => {},
});

export default AuthenticationContext;
