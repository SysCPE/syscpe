import { Button } from '@mui/material';
import useAuthentication from 'providers/authentication/useAuthentication';

const LoginButton = () => {
  const { loginWithRedirect } = useAuthentication();

  return <Button onClick={loginWithRedirect}>Login</Button>;
};

export default LoginButton;
