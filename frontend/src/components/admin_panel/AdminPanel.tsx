import { Grid } from '@material-ui/core';
import MembersUpload from './members_upload/MembersUpload';

const AdminPanel = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <MembersUpload />
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
