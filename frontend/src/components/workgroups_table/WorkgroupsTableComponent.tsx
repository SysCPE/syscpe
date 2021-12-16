import TableComponent from 'components/table/TableComponent';
import WorkgroupUploadFormComponent from 'components/workgroup_upload/WorkgroupUploadFormComponent';
import WorkgroupContext from 'providers/workgroups/WorkgroupsContext';
import WorkgroupTableHeaderComponent from './WorkgroupsTableHeaderComponent';
import WorkgroupsTableItemComponent from './WorkgroupsTableItemComponent';

const WorkgroupsTableComponent = () => {
  return (
    <TableComponent
      listContext={WorkgroupContext}
      emptyListWarning="Nenhum Grupo de Trabalho criado"
      failedMessage="Carregamento de Grupos de Trabalho falhou"
      header={<WorkgroupTableHeaderComponent />}
      renderItem={(workgroup) => (
        <WorkgroupsTableItemComponent workgroup={workgroup} />
      )}
      createForm={<WorkgroupUploadFormComponent />}
    />
  );
};

export default WorkgroupsTableComponent;
