import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

type Props = {
  loading?: boolean;
  icon: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?:
    | 'inherit'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
};
const LoadingIconButtonComponent: FC<Props> = ({
  loading = false,
  icon,
  onClick,
  color,
}) => {
  return (
    <div style={{ display: 'relative' }}>
      <Tooltip title="Deletar">
        <IconButton
          size="small"
          onClick={onClick}
          color={color}
          disabled={loading}
        >
          {loading && (
            <CircularProgress
              sx={{ position: 'absolute' }}
              size={24}
              color={color}
            />
          )}
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LoadingIconButtonComponent;
