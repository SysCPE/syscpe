import AssignMemberComponent from 'components/assign_member/AssignMemberComponent';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import DepartmentsContexts from 'providers/departments/DepartmentsContexts';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentAssignMemberComponent: FC<Props> = ({ department }) => {
  return (
    <AssignMemberComponent
      title={`Adicionar membros ao departamento ${department.name}`}
      item={department}
      context={DepartmentsContexts.withMemberAssociation}
      failMessage={`Houve um erro ao associar membro ao departamento ${department.name}`}
      successMessage={`Membro associado ao departamento ${department.name} com sucesso`}
    />
  );
};

export default DepartmentAssignMemberComponent;
