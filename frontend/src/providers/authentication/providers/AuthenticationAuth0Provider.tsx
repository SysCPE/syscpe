import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  AUTH0_API_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_REDIRECT_URI,
} from 'config/auth0';
import AuthenticationCore from 'providers/authentication/AuthenticationCore';
import { FC, useEffect } from 'react';
import configureAxios from 'services/configureAxios';

const AuthenticationAuth0Provider: FC = ({ children }) => {
  return (
    // TODO: restrict token scopes to include only email
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      audience={AUTH0_API_AUDIENCE}
      redirectUri={AUTH0_REDIRECT_URI}
    >
      <AuthenticationAuth0Core>{children}</AuthenticationAuth0Core>
    </Auth0Provider>
  );
};

const AuthenticationAuth0Core: FC = ({ children }) => {
  const {
    isLoading,
    isAuthenticated,
    user,
    logout,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) configureAxios(getAccessTokenSilently);
    else configureAxios();
  }, [isAuthenticated, getAccessTokenSilently]);

  const _loginWithRedirect = () =>
    loginWithRedirect({ redirectUri: AUTH0_REDIRECT_URI });

  return (
    <AuthenticationCore
      loading={isLoading}
      authenticated={isAuthenticated}
      userEmail={user?.email}
      logout={() => logout({ returnTo: window.location.origin })}
      loginWithRedirect={_loginWithRedirect}
    >
      {children}
    </AuthenticationCore>
  );
};

export default AuthenticationAuth0Provider;
