import { Fade, Grid, TableRow } from '@mui/material';
import TableCell from 'components/table/TableCell';
import WorkgroupEndComponent from 'components/workgroup_end/WorkgroupEndComponent';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import { FC } from 'react';

type Props = {
  workgroup: WorkgroupEntity;
};
const WorkgroupsTableItemComponent: FC<Props> = ({ workgroup }) => {
  return (
    <Fade in={true} key={workgroup.id}>
      <TableRow>
        <TableCell width="20%">{workgroup.name}</TableCell>
        <TableCell width="60%">{workgroup.description}</TableCell>
        <TableCell width="20%" align="center">
          <Grid container justifyContent="center" spacing={0}>
            {/* <DepartmentAssignMemberComponent department={department} /> */}
            <div style={{ margin: 8 }}></div>
            <WorkgroupEndComponent workgroup={workgroup} />
          </Grid>
        </TableCell>
      </TableRow>
    </Fade>
  );
};

export default WorkgroupsTableItemComponent;
