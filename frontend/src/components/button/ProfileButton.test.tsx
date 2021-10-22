import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useAuthentication from 'providers/authentication/useAuthentication';
import ProfileButton from './ProfileButton';

jest.mock('providers/authentication/useAuthentication');

describe('ProfileButton', () => {
  const setup = () => {
    const mockLogout = jest.fn();
    (useAuthentication as jest.Mock).mockReturnValue({
      email: 'test@gmail.com',
      logout: mockLogout,
    });
    render(<ProfileButton />);

    return { mockLogout };
  };

  it('should show email in profile menu', async () => {
    setup();

    userEvent.click(screen.getByRole('button', { name: 'profile-button' }));

    await waitFor(() =>
      expect(screen.getByText('test@gmail.com')).toBeVisible()
    );
  });

  it('should call logout when logout button is clicked', async () => {
    const { mockLogout } = setup();

    userEvent.click(screen.getByRole('button', { name: 'profile-button' }));

    await waitFor(() => expect(screen.getByText('Logout')).toBeVisible());

    userEvent.click(screen.getByText('Logout'));

    expect(mockLogout).toBeCalled();
  });
});
