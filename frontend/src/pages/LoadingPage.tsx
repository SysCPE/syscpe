import { CircularProgress, Grid } from '@mui/material';
import Page from './Page';

const LoadingPage = () => {
  return (
    <Page>
      <Grid container justifyContent="center">
        <CircularProgress aria-label="circular-progress" color="secondary" />
      </Grid>
    </Page>
  );
};

export default LoadingPage;
