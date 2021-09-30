import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should render text', () => {
    render(<App />);
    screen.getByText('SysCPE');
  });

  it('should hide SysCPE when button is clicked', async () => {
    render(<App />);
    userEvent.click(screen.getByText('Hide'));
    await waitFor(() =>
      expect(screen.queryByText('SysCPE')).not.toBeInTheDocument()
    );
  });
});
