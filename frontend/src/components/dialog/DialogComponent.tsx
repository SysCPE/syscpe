import { Breakpoint, Dialog } from '@mui/material';
import { FC, Fragment, useState } from 'react';

type Props = {
  body: JSX.Element;
  renderButton: (onOpen: () => void) => JSX.Element;
  maxWidth?: Breakpoint;
};
const DialogComponent: FC<Props> = ({
  body,
  renderButton,
  maxWidth = 'lg',
}) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Fragment>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={maxWidth}>
        {body}
      </Dialog>

      {renderButton(openDialog)}
    </Fragment>
  );
};

export default DialogComponent;
