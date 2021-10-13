import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('should show email error message', () => {
    render(<LoginPage />);

    userEvent.click(screen.getByText('Entrar'));

    expect(screen.getByText('Email não pode ser vazio')).toBeVisible();
  });

  it('should show password error message', () => {
    render(<LoginPage />);

    userEvent.type(screen.getByLabelText('Email'), 'email');
    userEvent.click(screen.getByText('Entrar'));

    expect(screen.getByText('Senha não pode ser vazia')).toBeVisible();
  });

  it('should disable submit button when it is clicked and form is valid', async () => {
    render(<LoginPage />);

    userEvent.type(screen.getByLabelText('Email'), 'email');
    userEvent.type(screen.getByLabelText('Senha'), 'password');
    userEvent.click(screen.getByText('Entrar'));

    expect(screen.getByText('Entrar')).toBeDisabled();
    await waitFor(() => expect(screen.getByText('Entrar')).not.toBeDisabled());
  });
});
