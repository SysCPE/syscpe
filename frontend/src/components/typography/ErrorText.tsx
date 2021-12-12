import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';

type Props = {
  error: string;
};
const ErrorText: FC<Props> = ({ error }) => {
  return (
    <Typography
      variant="body1"
      sx={{ color: (theme: Theme) => theme.palette.error.main }}
    >
      <i>{error}</i>
    </Typography>
  );
};

export default ErrorText;
