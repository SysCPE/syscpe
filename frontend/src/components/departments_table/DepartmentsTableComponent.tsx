import DepartmentUploadFormComponent from 'components/department_upload/DepartmentUploadFormComponent';
import TableComponent from 'components/table/TableComponent';
import DepartmentsContexts from 'providers/departments/DepartmentsContexts';
import DepartmentsTableHeaderComponent from './DepartmentsTableHeaderComponent';
import DepartmentsTableItemComponent from './DepartmentsTableItemComponent';

const DepartmentsTableComponent = () => {
  return (
    <TableComponent
      listContext={DepartmentsContexts.withListContext}
      emptyListWarning="Nenhum departamento criado"
      failedMessage="Carregamento de departamentos falhou"
      header={<DepartmentsTableHeaderComponent />}
      renderItem={(department) => (
        <DepartmentsTableItemComponent department={department} />
      )}
      createForm={<DepartmentUploadFormComponent />}
    />
  );
};

export default DepartmentsTableComponent;
