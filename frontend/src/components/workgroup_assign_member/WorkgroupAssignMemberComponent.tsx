import AssignMemberComponent from 'components/assign_member/AssignMemberComponent';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import WorkgroupsContexts from 'providers/workgroups/WorkgroupsContexts';
import { FC } from 'react';

type Props = {
  workgroup: WorkgroupEntity;
};
const WorkgroupAssignMemberComponent: FC<Props> = ({ workgroup }) => {
  return (
    <AssignMemberComponent
      title={`Adicionar membros ao GT ${workgroup.name}`}
      item={workgroup}
      context={WorkgroupsContexts.withMemberAssociation}
      failMessage={`Houve um erro ao associar membro ao departamento ${workgroup.name}`}
      successMessage={`Membro associado ao departamento ${workgroup.name} com sucesso`}
      filterMembers={(member, workgroup) => false}
    />
  );
};

export default WorkgroupAssignMemberComponent;
