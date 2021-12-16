import deleteDepartmentUseCase from 'domain/departments/usecases/delete_department_usecase';
import listDepartmentsUseCase from 'domain/departments/usecases/list_departments_usecase';
import associateMemberWithDepartment from 'domain/member_department/usecases/associate_member_with_department';
import ListProvider from 'providers/list/ListProvider';
import WithMemberAssociationProvider from 'providers/with_member_association/WithMemberAssociationProvider';
import { FC } from 'react';
import DepartmentsContexts from './DepartmentsContexts';

const DepartmentsProvider: FC = ({ children }) => {
  return (
    <ListProvider
      context={DepartmentsContexts.withListContext}
      listItems={listDepartmentsUseCase}
      deleteItem={deleteDepartmentUseCase}
    >
      <WithMemberAssociationProvider
        context={DepartmentsContexts.withMemberAssociation}
        associateMember={associateMemberWithDepartment}
      >
        {children}
      </WithMemberAssociationProvider>
    </ListProvider>
  );
};

export default DepartmentsProvider;
