import { Fade, TableRow } from '@mui/material';
import TableCell from 'components/table/TableCell';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentsTableItemComponent: FC<Props> = ({ department }) => {
  return (
    <Fade in={true} key={department.name}>
      <TableRow>
        <TableCell width="20%">{department.name}</TableCell>
        <TableCell width="20%">{department.director}</TableCell>
        <TableCell width="20%">{department.viceDirector}</TableCell>
        <TableCell width="20%">{department.description}</TableCell>
        <TableCell width="20" align="center"></TableCell>
      </TableRow>
    </Fade>
  );
};

export default DepartmentsTableItemComponent;
