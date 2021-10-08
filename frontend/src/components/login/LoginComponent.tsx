import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import APP_NAME from 'config/app_name';
import { FC, Fragment, useState } from 'react';

type Props = {
  loading: boolean;
  submit: (email: string, password: string) => void;
};
const LoginComponent: FC<Props> = ({ loading, submit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => submit(email, password);

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        xs={12}
        sm={10}
        md={6}
      >
        <Grid item container>
          <Typography variant="h6">Entre no {APP_NAME}</Typography>
        </Grid>

        <Grid item container sx={{ marginTop: 5 }}>
          <TextField
            id="email-input"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </Grid>

        <Grid item container sx={{ marginTop: 2 }}>
          <TextField
            id="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          ></TextField>
        </Grid>

        <Grid item container sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <Fragment />}
          >
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginComponent;
