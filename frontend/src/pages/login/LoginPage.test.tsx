import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvalidCredentials from 'domain/authentication/errors/InvalidCredentials';
import each from 'jest-each';
import AuthenticationProvider from 'providers/authentication/AuthenticationProvider';
import authenticationService from 'services/authentication';
import LoginPage from './LoginPage';

jest.mock('services/authentication');

describe('LoginPage', () => {
  const setup = () => {
    render(
      <AuthenticationProvider>
        <LoginPage />
      </AuthenticationProvider>
    );
  };

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

  each([
    [new Error('login failed'), 'O login falhou\nTente novamente'],
    [new InvalidCredentials(), 'Email ou senha inválidos'],
  ]).it(
    'should show login failed error message when login fails',
    async (error: Error, expectedErrorMessage: string) => {
      authenticationService.login = jest.fn();
      (authenticationService.login as jest.Mock).mockRejectedValue(error);

      setup();

      userEvent.type(screen.getByLabelText('Email'), 'email');
      userEvent.type(screen.getByLabelText('Senha'), 'password');

      userEvent.click(screen.getByText('Entrar'));

      expect(screen.getByText('Entrar')).toBeDisabled();

      await waitFor(() =>
        expect(
          screen.getByText((_, node) => {
            if (!node) return false;

            const hasText = (node: Element) =>
              node.textContent === expectedErrorMessage;
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
              (child) => !hasText(child)
            );

            return nodeHasText && childrenDontHaveText;
          })
        )
      );
    }
  );
});
