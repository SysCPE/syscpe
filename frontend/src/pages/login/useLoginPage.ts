import LoginForm from 'domain/authentication/entities/LoginForm';
import InvalidCredentials from 'domain/authentication/errors/InvalidCredentials';
import useAuthentication from 'providers/authentication/useAuthentication';
import useLogger from 'providers/logger/useLogger';
import { useState } from 'react';
import useSubmit from 'utils/useSubmit';

const useLoginPage = () => {
  const { logError } = useLogger();
  const { loginEmailPassword } = useAuthentication();
  const [errorMessage, setErrorMessage] = useState('');

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const { loading, submit } = useSubmit(
    async () => {
      const { email, password } = loginForm;
      await loginEmailPassword(email, password);
    },
    () => {},
    (error) => {
      switch (error.constructor) {
        case InvalidCredentials:
          return setErrorMessage('Email ou senha inválidos');

        default:
          setErrorMessage('O login falhou\nTente novamente');
          logError(error);
      }
    }
  );

  const onSubmit = (email = '', password = '') => {
    if (!email.trim().length) {
      setErrorMessage('Email não pode ser vazio');
      return;
    }

    if (!password.trim().length) {
      setErrorMessage('Senha não pode ser vazia');
      return;
    }

    setErrorMessage('');
    setLoginForm({ email, password });

    submit();
  };

  return { error: errorMessage, loading, onSubmit };
};

export default useLoginPage;
