import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useAuthentication from 'providers/authentication/useAuthentication';
import LoginButton from './LoginButton';

jest.mock('providers/authentication/useAuthentication');

describe('LoginButton', () => {
  it('should call loginWithRedirect when login button is clicked', () => {
    const mockLoginWithRedirect = jest.fn();
    (useAuthentication as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    });
    render(<LoginButton />);

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(mockLoginWithRedirect).toBeCalled();
  });
});
