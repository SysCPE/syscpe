import DetailsComponent from 'components/details/DetailsComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import MembersContext from 'providers/members/MembersContext';
import { FC } from 'react';
import MemberDetailsFormComponent from './MemberDetailsFormComponent';

type Props = {
  member: MemberEntity;
};
const MemberDetailsModalComponent: FC<Props> = ({ member }) => {
  return (
    <DetailsComponent
      item={member}
      Form={MemberDetailsFormComponent}
      sucessMessage="Membro editado com sucesso"
      failMessage="Ocorreu um erro na hora de editar membro"
      context={MembersContext}
    />
  );
};

export default MemberDetailsModalComponent;
