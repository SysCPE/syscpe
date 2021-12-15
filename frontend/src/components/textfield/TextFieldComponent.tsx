import { Collapse, Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};
const TextFieldComponent: FC<Props> = ({
  label,
  value,
  onChange,
  error = '',
}) => {
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

      <Collapse in={!!error} unmountOnExit>
        <Grid item alignSelf="flex-end" sx={{ marginTop: 1 }}>
          <Typography variant="body1" color="error" sx={{ textAlign: 'end' }}>
            {error}
          </Typography>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default TextFieldComponent;
