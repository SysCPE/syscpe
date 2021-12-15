import { Fade, Grid, TableRow } from '@mui/material';
import DepartmentAssignMemberComponent from 'components/department_assign_member/DepartmentAssignMemberComponent';
import DepartmentDeleteComponent from 'components/department_delete/DepartmentDeleteComponent';
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
        <TableCell width="20" align="center">
          <Grid container justifyContent="center" spacing={0}>
            <DepartmentAssignMemberComponent department={department} />
            <div style={{ margin: 8 }}></div>
            <DepartmentDeleteComponent department={department} />
          </Grid>
        </TableCell>
      </TableRow>
    </Fade>
  );
};

export default DepartmentsTableItemComponent;
