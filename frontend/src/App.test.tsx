import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import APP_NAME from 'config/app_name';
import App from './App';

describe('App', () => {
  it('should render text', () => {
    render(<App />);
    screen.getByText(APP_NAME);
  });

  it('should hide SysCPE when button is clicked', async () => {
    render(<App />);
    userEvent.click(screen.getByText('Hide'));
    await waitFor(() =>
      expect(screen.queryByText(APP_NAME)).not.toBeInTheDocument()
    );
  });
});
