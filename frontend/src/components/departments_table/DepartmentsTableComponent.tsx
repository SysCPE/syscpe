import TableComponent from 'components/table/TableComponent';
import DepartmentsListContext from 'providers/departments/DepartmentsListContext';
import DepartmentsTableHeaderComponent from './DepartmentsTableHeaderComponent';
import DepartmentsTableItemComponent from './DepartmentsTableItemComponent';

const DepartmentsTableComponent = () => {
  return (
    <TableComponent
      listContext={DepartmentsListContext}
      emptyListWarning="Nenhum departamento criado"
      failedMessage="Carregamento de departamentos falhou"
      header={<DepartmentsTableHeaderComponent />}
      onAddButtonClick={() => {}}
      renderItem={(department) => (
        <DepartmentsTableItemComponent department={department} />
      )}
    />
  );
};

export default DepartmentsTableComponent;
