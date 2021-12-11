import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { SnackbarKey, useSnackbar } from 'notistack';
import { FC } from 'react';

type Props = {
  snackbarKey: SnackbarKey;
};
const SnackbarCloseButton: FC<Props> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      onClick={() => closeSnackbar(snackbarKey)}
      sx={{ color: 'white' }}
    >
      <Close />
    </IconButton>
  );
};

export default SnackbarCloseButton;
