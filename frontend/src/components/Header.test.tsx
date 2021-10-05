import { render, screen } from '@testing-library/react';
import APP_NAME from 'config/app_name';
import Header from './Header';

describe('Header', () => {
  it('should show app name', () => {
    render(<Header></Header>);
    screen.getByText(APP_NAME);
  });

  it('should show login button', () => {
    render(<Header></Header>);
    screen.getByRole('button', { name: 'Login' });
  });
});
