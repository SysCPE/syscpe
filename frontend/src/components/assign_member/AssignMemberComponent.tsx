import { GroupsOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import DialogComponent from 'components/dialog/DialogComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import WithMemberAssociationContextType from 'providers/with_member_association/WithMemberAssociationContextType';
import { Context } from 'react';
import AssignMemberFormComponent from './AssignMemberForm';

type Props<T> = {
  context: Context<WithMemberAssociationContextType<T>>;
  title: string;
  item: T;
  filterMembers: (member: MemberEntity, item: T) => boolean;
  failMessage: string;
  successMessage: string;
};
function AssignMemberComponent<T>({
  title,
  item,
  context,
  failMessage,
  successMessage,
  filterMembers,
}: Props<T>) {
  return (
    <DialogComponent
      body={
        <AssignMemberFormComponent
          context={context}
          title={title}
          item={item}
          failMessage={failMessage}
          successMessage={successMessage}
          filterMembers={filterMembers}
        />
      }
      renderButton={(onOpen) => (
        <Tooltip title="Adicionar Membros">
          <IconButton size="small" onClick={onOpen} color="success">
            <GroupsOutlined fontSize="small" color="success" />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}

export default AssignMemberComponent;
