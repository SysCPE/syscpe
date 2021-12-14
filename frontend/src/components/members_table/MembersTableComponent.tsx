import MembersUploadFormComponent from 'components/members_upload/MembersUploadFormComponent';
import TableComponent from 'components/table/TableComponent';
import MembersContext from 'providers/members/MembersContext';
import MembersTableHeader from './MembersTableHeader';
import MembersTableItem from './MembersTableItem';

const MembersTableComponent = () => {
  return (
    <TableComponent
      listContext={MembersContext}
      header={<MembersTableHeader />}
      renderItem={(member) => <MembersTableItem member={member} />}
      emptyListWarning="Nenhum membro adicionado"
      failedMessage="Carregamento de membros falhou"
      createForm={<MembersUploadFormComponent />}
    />
  );
};

export default MembersTableComponent;
