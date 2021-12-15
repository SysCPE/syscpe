import { GroupsOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import DialogComponent from 'components/dialog/DialogComponent';
import { FC } from 'react';
import AssignMemberFormComponent from './AssignMemberForm';

type Props = {
  title: string;
};
const AssignMemberComponent: FC<Props> = ({ title }) => {
  return (
    <DialogComponent
      body={<AssignMemberFormComponent title={title} />}
      renderButton={(onOpen) => (
        <Tooltip title="Adicionar Membros">
          <IconButton size="small" onClick={onOpen} color="success">
            <GroupsOutlined fontSize="small" color="success" />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

export default AssignMemberComponent;
