import { Grid } from '@material-ui/core';
import { FC } from 'react';

const Page: FC = ({ children }) => {
  return (
    <Grid container sx={{ paddingTop: 5 }}>
      {children}
    </Grid>
  );
};

export default Page;
