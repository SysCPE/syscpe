import assignMemberToWorkgroupUseCase from 'domain/member_workgroup/usecases/assign_member_to_workgroup_usecase';
import editWorkgroupUseCase from 'domain/workgroup/usecases/edit_workgroup_usecase';
import endWorkgroupUseCase from 'domain/workgroup/usecases/end_workgroup_usecase';
import listWorkgroupsUseCase from 'domain/workgroup/usecases/list_workgroups_usecase';
import ListProvider from 'providers/list/ListProvider';
import WithMemberAssociationProvider from 'providers/with_member_association/WithMemberAssociationProvider';
import { FC } from 'react';
import WorkgroupsContexts from './WorkgroupsContexts';

const WorkgroupProvider: FC = ({ children }) => {
  return (
    <ListProvider
      context={WorkgroupsContexts.withListContext}
      listItems={listWorkgroupsUseCase}
      deleteItem={endWorkgroupUseCase}
      editItem={editWorkgroupUseCase}
    >
      <WithMemberAssociationProvider
        context={WorkgroupsContexts.withMemberAssociation}
        associateMember={assignMemberToWorkgroupUseCase}
      >
        {children}
      </WithMemberAssociationProvider>
    </ListProvider>
  );
};

export default WorkgroupProvider;
