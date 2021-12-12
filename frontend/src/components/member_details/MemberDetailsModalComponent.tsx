import { Close, Info, Save } from '@mui/icons-material';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Fab,
  Grow,
  IconButton,
  styled,
  Tooltip,
} from '@mui/material';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { FC, Fragment, useEffect, useState } from 'react';
import MemberDetailsFormComponent from './MemberDetailsFormComponent';
import useMemberDetails from './useMemberDetails';

const CustomDialog = styled(Dialog)(() => ({
  '& .MuiDialog-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
  },
  '& .MuiDialog-container': {
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
  },
}));

type Props = {
  member: MemberEntity;
};
const MemberDetailsModalComponent: FC<Props> = ({ member }) => {
  const { currentMember, setCurrentMember, hasChanged, saveMember, loading } =
    useMemberDetails(member);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasChanged) return;
    if (!open) setCurrentMember(member);
  }, [open, setCurrentMember, member, hasChanged]);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Fragment>
      <CustomDialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        transitionDuration={{
          exit: 0,
          enter: 400,
          appear: 400,
        }}
      >
        <DialogContent sx={{ height: '80vh', position: 'relative' }}>
          <IconButton
            onClick={closeDialog}
            sx={{ position: 'absolute', right: 0, top: 0, margin: 1 }}
          >
            <Close />
          </IconButton>

          <MemberDetailsFormComponent
            member={currentMember}
            onChange={setCurrentMember}
          />

          <Grow in={hasChanged}>
            <Tooltip title="Salvar mudanças" placement="left">
              <Fab
                color="secondary"
                sx={{ position: 'absolute', right: 0, bottom: 0, margin: 2 }}
                onClick={saveMember}
                disabled={loading}
              >
                {loading && <CircularProgress sx={{ position: 'absolute' }} />}
                <Save />
              </Fab>
            </Tooltip>
          </Grow>
        </DialogContent>
      </CustomDialog>

      <Tooltip title="Ver dados">
        <IconButton color="secondary" size="small" onClick={openDialog}>
          <Info fontSize="small" />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default MemberDetailsModalComponent;
