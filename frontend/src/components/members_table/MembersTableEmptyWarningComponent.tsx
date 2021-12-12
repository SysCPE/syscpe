import { Grid, Typography } from '@mui/material';

const MembersTableEmptyWarningComponent = () => {
  return (
    <Grid container justifyContent="center" sx={{ padding: 1 }}>
      <Typography variant="body1">
        <b>Nenhum membro adicionado</b>
      </Typography>
    </Grid>
  );
};

export default MembersTableEmptyWarningComponent;
