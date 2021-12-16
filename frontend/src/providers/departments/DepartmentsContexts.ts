import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import defaultListContext from 'providers/list/defaultListContext';
import ListContextType from 'providers/list/ListContextType';
import defaultWithMemberAssociationContext from 'providers/with_member_association/defaultWithMemberAssociationContext';
import WithMemberAssociationContextType from 'providers/with_member_association/WithMemberAssociationContextType';
import { Context, createContext } from 'react';

type DepartmentsContextsType = {
  withListContext: Context<ListContextType<DepartmentEntity>>;
  withMemberAssociation: Context<
    WithMemberAssociationContextType<DepartmentEntity>
  >;
};
const DepartmentsContexts: DepartmentsContextsType = {
  withListContext: createContext(defaultListContext<DepartmentEntity>()),
  withMemberAssociation: createContext(
    defaultWithMemberAssociationContext<DepartmentEntity>()
  ),
};

export default DepartmentsContexts;
