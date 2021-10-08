import useAuthentication from 'providers/authentication/useAuthentication';
import { useState } from 'react';
import useSubmit from 'utils/useSubmit';

const useLoginPage = () => {
  const { loginEmailPassword } = useAuthentication();
  const [errorMessage, setErrorMessage] = useState('');

  const { loading } = useSubmit(async () => {});

  const onSubmit = (email: string, password: string) => {};

  return { error: errorMessage, loading, onSubmit };
};

export default useLoginPage;
