import { Typography } from '@mui/material';
import DeleteButtonComponent from 'components/delete_button/DeleteButtonComponent';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import DepartmentsContext from 'providers/departments/DepartmentsContext';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentDeleteComponent: FC<Props> = ({ department }) => {
  return (
    <DeleteButtonComponent
      value={department}
      context={DepartmentsContext}
      warning={
        <Typography variant="body1">
          Clique novamente para <b>remover</b> este departamento
        </Typography>
      }
      successMessage="Departamento deletado com sucesso"
      failMessage={`Ocorreu um erro na hora de deletar departamento "${department.name}"`}
    />
  );
};

export default DepartmentDeleteComponent;
