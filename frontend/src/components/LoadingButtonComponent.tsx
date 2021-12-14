import { Button, CircularProgress, SxProps, Theme } from '@mui/material';
import { FC, Fragment } from 'react';

type Props = {
  loading?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
};
const LoadingButtonComponent: FC<Props> = ({
  onClick,
  loading,
  children,
  sx,
}) => {
  return (
    <Fragment>
      <Button sx={sx} onClick={onClick} disabled={loading}>
        {loading && (
          <CircularProgress
            size={16}
            sx={{ marginRight: 1 }}
            color="secondary"
          />
        )}
        {children}
      </Button>
    </Fragment>
  );
};

export default LoadingButtonComponent;
