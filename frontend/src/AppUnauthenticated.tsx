import { Grid, Typography } from '@material-ui/core';
import Page from 'pages/Page';

const AppUnauthenticated = () => {
  return (
    <Page>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h5">Você não está autenticado</Typography>
        </Grid>
      </Grid>
    </Page>
  );
};

export default AppUnauthenticated;
