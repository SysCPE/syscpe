import MembersUploadModalComponent from 'components/members_upload/MembersUploadModalComponent';
import TableComponent from 'components/table/TableComponent';
import MembersListContext from 'providers/members/MembersListContext';
import MembersTableHeader from './MembersTableHeader';
import MembersTableItem from './MembersTableItem';

const MembersTableComponent = () => {
  return (
    <MembersUploadModalComponent
      render={(onOpen) => (
        <TableComponent
          listContext={MembersListContext}
          header={<MembersTableHeader />}
          renderItem={(member) => <MembersTableItem member={member} />}
          emptyListWarning="Nenhum membro adicionado"
          failedMessage="Carregamento de membros falhou"
          onAddButtonClick={onOpen}
        />
      )}
    />
  );
};

export default MembersTableComponent;
