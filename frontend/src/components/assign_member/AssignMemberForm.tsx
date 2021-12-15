import { DialogContent, DialogTitle, Grid } from '@mui/material';
import LoadingButtonComponent from 'components/LoadingButtonComponent';
import MembersAutocompleteComponent from 'components/members_autocomplete/MembersAutocompleteComponent';
import { FC, Fragment } from 'react';

type Props = {
  title: string;
};
const AssignMemberFormComponent: FC<Props> = ({ title }) => {
  return (
    <Fragment>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container direction="column" sx={{ padding: 2 }}>
          <MembersAutocompleteComponent />

          <Grid item sx={{ marginTop: 2 }} alignSelf="flex-end">
            <LoadingButtonComponent sx={{ textTransform: 'none' }}>
              Associar Membro
            </LoadingButtonComponent>
          </Grid>
        </Grid>
      </DialogContent>
    </Fragment>
  );
};

export default AssignMemberFormComponent;
