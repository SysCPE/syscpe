import { render, screen } from '@testing-library/react';
import APP_NAME from 'config/app_name';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  const setup = () => {
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

  it('should show login button', () => {
    setup();
    screen.getByRole('button', { name: 'Login' });
  });
});
