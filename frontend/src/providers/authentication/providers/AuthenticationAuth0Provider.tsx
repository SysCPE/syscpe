import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  AUTH0_API_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} from 'config/auth0';
import AuthenticationCore from 'providers/authentication/AuthenticationCore';
import { FC } from 'react';

const AuthenticationAuth0Provider: FC = ({ children }) => {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      audience={AUTH0_API_AUDIENCE}
      redirectUri={window.location.origin}
    >
      <AuthenticationAuth0Core>{children}</AuthenticationAuth0Core>
    </Auth0Provider>
  );
};

const AuthenticationAuth0Core: FC = ({ children }) => {
  const { isLoading, isAuthenticated, user, logout } = useAuth0();

  return (
    <AuthenticationCore
      loading={isLoading}
      authenticated={isAuthenticated}
      userEmail={user?.email}
      logout={() => logout({ returnTo: window.location.origin })}
    >
      {children}
    </AuthenticationCore>
  );
};

export default AuthenticationAuth0Provider;
