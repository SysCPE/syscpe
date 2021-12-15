import { Typography } from '@mui/material';
import DeleteButtonComponent from 'components/delete_button/DeleteButtonComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import MembersContext from 'providers/members/MembersContext';
import { FC } from 'react';

type Props = { member: MemberEntity };
const MemberDeleteMenuComponent: FC<Props> = ({ member }) => {
  return (
    <DeleteButtonComponent
      value={member}
      context={MembersContext}
      warning={
        <Typography variant="body1">
          Clique novamente para <b>remover</b> este membro
        </Typography>
      }
      successMessage="Membro deletado com sucesso"
      failMessage="Ocorreu um erro na hora de adicionar novos membros"
    />
  );
};

export default MemberDeleteMenuComponent;
