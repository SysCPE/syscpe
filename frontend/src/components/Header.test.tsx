import { render, screen } from '@testing-library/react';
import APP_NAME from 'config/app_name';
import { createMemoryHistory } from 'history';
import useAuthentication from 'providers/authentication/useAuthentication';
import { Router } from 'react-router-dom';
import Header from './Header';

jest.mock('providers/authentication/useAuthentication');

describe('Header', () => {
  const setup = (authenticated = false) => {
    (useAuthentication as jest.Mock).mockReturnValue({ authenticated });

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Header></Header>
      </Router>
    );
  };

  it('should show app name', () => {
    setup();
    screen.getByText(APP_NAME);
  });

  it('should show login button when unauthenticated', () => {
    setup();
    screen.getByRole('button', { name: 'Login' });
  });

  it('should show profile buttion when authenticated', () => {
    setup(true);
    screen.getByRole('button', { name: 'profile-button' });
  });
});
