import { Grid, Typography } from '@material-ui/core';

const MembersTableEmptyWarningComponent = () => {
  return (
    <Grid container justifyContent="center" sx={{ padding: 1 }}>
      <Typography variant="body1">Nenhum membro adicionado</Typography>
    </Grid>
  );
};

export default MembersTableEmptyWarningComponent;
