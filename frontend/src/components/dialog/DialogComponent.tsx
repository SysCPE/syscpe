import { Breakpoint, Dialog } from '@mui/material';
import { FC, Fragment, useState } from 'react';

type Props = {
  body: JSX.Element | ((closeDialog: () => void) => JSX.Element);
  renderButton: (openDialog: () => void) => JSX.Element;
  maxWidth?: Breakpoint;
  onClose?: () => void;
};
const DialogComponent: FC<Props> = ({
  body,
  renderButton,
  maxWidth = 'lg',
  onClose,
}) => {
  const isBodyFunction = typeof body === 'function';
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={maxWidth}>
        {isBodyFunction ? body(closeDialog) : body}
      </Dialog>

      {renderButton(openDialog)}
    </Fragment>
  );
};

export default DialogComponent;
