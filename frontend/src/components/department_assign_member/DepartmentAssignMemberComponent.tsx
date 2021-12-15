import AssignMemberComponent from 'components/assign_member/AssignMemberComponent';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentAssignMemberComponent: FC<Props> = ({ department }) => {
  return (
    <AssignMemberComponent
      title={`Adicionar membros ao departamento "${department.name}"`}
    />
  );
};

export default DepartmentAssignMemberComponent;
