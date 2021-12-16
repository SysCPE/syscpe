import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  message: string;
};
const TableEmptyWarningComponent: FC<Props> = ({ message }) => {
  return (
    <Grid container justifyContent="center" sx={{ padding: 1 }}>
      <Typography variant="body1">
        <b>{message}</b>
      </Typography>
    </Grid>
  );
};

export default TableEmptyWarningComponent;
