import { render, screen } from '@testing-library/react';
import App from 'App';
import useAuthentication from 'providers/authentication/useAuthentication';

jest.mock('providers/authentication/useAuthentication');

describe('App', () => {
  it('should show circular progress when authentication is loading', () => {
    (useAuthentication as jest.Mock).mockReturnValue({ loading: true });
    render(<App />);

    screen.getByLabelText('circular-progress');
  });
});
