import { useAuth0 } from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginButton from './LoginButton';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

describe('LoginButton', () => {
  it('should call loginWithRedirect when login button is clicked', () => {
    const mockLoginWithRedirect = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    });
    render(<LoginButton />);

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(mockLoginWithRedirect).toBeCalled();
  });
});
