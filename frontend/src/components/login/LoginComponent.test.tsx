import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginComponent from './LoginComponent';

describe('LoginComponent', () => {
  it('should call submit with right arguments', () => {
    const submit = jest.fn();
    render(<LoginComponent error="" loading={false} submit={submit} />);

    userEvent.type(screen.getByLabelText('Email'), 'email');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Entrar'));

    expect(submit).toBeCalledWith('email', 'password');
  });

  it('should disable submit button when loading', () => {
    render(<LoginComponent error="" loading={true} submit={() => {}} />);

    expect(screen.getByText('Entrar')).toBeDisabled();
  });

  it('should show error message', () => {
    const error = 'error message here';
    render(<LoginComponent error={error} loading={false} submit={() => {}} />);

    expect(screen.getByText(error)).toBeVisible();
  });
});
