import { Fade, Grid, TableRow } from '@mui/material';
import MemberDeleteMenuComponent from 'components/member_delete/MemberDeleteMenuComponent';
import MemberDetailsModalComponent from 'components/member_details/MemberDetailsModalComponent';
import TableCell from 'components/table/TableCell';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { FC } from 'react';
import MembersTableStatusCellComponent from './MembersTableStatusCellComponent';

type Props = {
  member: MemberEntity;
};
const MembersTableItem: FC<Props> = ({ member }) => {
  return (
    <Fade in={true}>
      <TableRow>
        <TableCell width="10%">{member.idCPE}</TableCell>
        <TableCell width="30%">{member.name}</TableCell>
        <TableCell width="15%">{member.course}</TableCell>
        <TableCell width="15%" align="center">
          {member.department}
        </TableCell>
        <TableCell width="10%" align="center">
          <MembersTableStatusCellComponent status={member.status} />
        </TableCell>
        <TableCell width="20%" align="center">
          <Grid container justifyContent="center" spacing={0}>
            <MemberDetailsModalComponent member={member} />

            <div style={{ margin: 8 }}></div>

            <MemberDeleteMenuComponent member={member} />
          </Grid>
        </TableCell>
      </TableRow>
    </Fade>
  );
};

export default MembersTableItem;
