import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import defaultListContext from 'providers/list/defaultListContext';
import ListContextType from 'providers/list/ListContextType';
import defaultWithMemberAssociationContext from 'providers/with_member_association/defaultWithMemberAssociationContext';
import WithMemberAssociationContextType from 'providers/with_member_association/WithMemberAssociationContextType';
import { Context, createContext } from 'react';

type WorkgroupsContextsType = {
  withListContext: Context<ListContextType<WorkgroupEntity>>;
  withMemberAssociation: Context<
    WithMemberAssociationContextType<WorkgroupEntity>
  >;
};
const WorkgroupsContexts: WorkgroupsContextsType = {
  withListContext: createContext(defaultListContext<WorkgroupEntity>()),
  withMemberAssociation: createContext(
    defaultWithMemberAssociationContext<WorkgroupEntity>()
  ),
};

export default WorkgroupsContexts;
