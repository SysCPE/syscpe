import { colors, Grid } from '@material-ui/core';
import { Box } from '@material-ui/system';
import MemberStatus from 'domain/members/entities/MemberStatus';
import { FC } from 'react';

type Props = {
  status: MemberStatus;
};
const MembersTableStatusCellComponent: FC<Props> = ({ status }) => {
  const color = {
    ACTIVE: colors.green[400],
    INACTIVE: colors.red[400],
    TIMEOFF: colors.orange[400],
  }[status];

  return (
    <Grid container justifyContent="center">
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor: color,
          borderRadius: 16,
          border: `1px solid ${colors.grey[600]}`,
        }}
      />
    </Grid>
  );
};

export default MembersTableStatusCellComponent;
