import { Grid } from '@material-ui/core';
import MembersTableComponent from 'components/members_table/MembersTableComponent';
import MembersUpload from './members_upload/MembersUpload';

const AdminPanel = () => {
  return (
    <Grid container sx={{ padding: 3 }} justifyContent="center">
      <Grid container item xs={12} sm={11} md={10} lg={9} direction="column">
        <Grid item>
          <MembersUpload />
        </Grid>

        <Grid item>
          <MembersTableComponent />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
