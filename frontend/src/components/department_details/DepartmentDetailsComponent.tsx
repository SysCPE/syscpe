import DeparmentEditFormComponent from 'components/department_edit_form/DepartmentEditFormComponent';
import DetailsComponent from 'components/details/DetailsComponent';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import DepartmentsContexts from 'providers/departments/DepartmentsContexts';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentDetailsComponent: FC<Props> = ({ department }) => {
  return (
    <DetailsComponent
      context={DepartmentsContexts.withListContext}
      item={department}
      failMessage={`Houve um erro na hora de editar departamento "${department.name}"`}
      sucessMessage={`Departamento "${department.name}" foi editado com sucesso`}
      Form={DeparmentEditFormComponent}
    />
  );
};

export default DepartmentDetailsComponent;
