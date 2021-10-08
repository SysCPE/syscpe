import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginComponent from './LoginComponent';

describe('LoginComponent', () => {
  it('should call submit with right arguments', () => {
    const submit = jest.fn();
    render(<LoginComponent loading={false} submit={submit} />);

    userEvent.type(screen.getByLabelText('Email'), 'email');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Entrar'));

    expect(submit).toBeCalledWith('email', 'password');
  });
});
