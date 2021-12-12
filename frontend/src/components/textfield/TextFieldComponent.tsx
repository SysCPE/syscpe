import { Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};
const TextFieldComponent: FC<Props> = ({ label, value, onChange }) => {
  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 1 }}>
        <Typography variant="body1">{label}</Typography>
      </Grid>

      <Grid item container>
        <TextField
          fullWidth
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default TextFieldComponent;
