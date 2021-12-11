import { Dialog, IconButton } from '@material-ui/core';
import { LoupeOutlined } from '@material-ui/icons';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { FC, Fragment, useState } from 'react';

type Props = {
  member: MemberEntity;
};
const MemberDetailsModalComponent: FC<Props> = ({ member }) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Fragment>
      <Dialog open={open} onClose={closeDialog}>
        {member.name}
      </Dialog>

      <IconButton color="secondary" size="small" onClick={openDialog}>
        <LoupeOutlined fontSize="small" />
      </IconButton>
    </Fragment>
  );
};

export default MemberDetailsModalComponent;
