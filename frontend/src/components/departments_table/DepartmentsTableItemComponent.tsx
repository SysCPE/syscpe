import { Fade, Grid, TableRow } from '@mui/material';
import DepartmentAssignMemberComponent from 'components/department_assign_member/DepartmentAssignMemberComponent';
import DepartmentDeleteComponent from 'components/department_delete/DepartmentDeleteComponent';
import DepartmentDetailsComponent from 'components/department_details/DepartmentDetailsComponent';
import TableCell from 'components/table/TableCell';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import useMembers from 'providers/members/useMembers';
import { FC } from 'react';

type Props = {
  department: DepartmentEntity;
};
const DepartmentsTableItemComponent: FC<Props> = ({ department }) => {
  const { items: members } = useMembers();

  // TODO: move this function somewhere where it can be shared
  const _getAdminMemberEntityById = (id?: number) => {
    if (!id) return null;
    return members.find((member) => member.idCPE === id) || null;
  };

  return (
    <Fade in={true} key={department.name}>
      <TableRow>
        <TableCell width="20%">{department.name}</TableCell>
        <TableCell width="20%">
          {_getAdminMemberEntityById(department.directorId)?.name || ''}
        </TableCell>
        <TableCell width="20%">
          {_getAdminMemberEntityById(department.viceDirectorId)?.name || ''}
        </TableCell>
        <TableCell width="20%">{department.description}</TableCell>
        <TableCell width="20" align="center">
          <Grid container justifyContent="center" spacing={0}>
            <DepartmentDetailsComponent department={department} />
            <div style={{ margin: 8 }}></div>
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
