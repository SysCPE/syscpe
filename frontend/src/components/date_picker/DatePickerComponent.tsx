import { DatePicker } from '@mui/lab';
import { Collapse, Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  label: string;
  error?: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
};
const DatePickerComponent: FC<Props> = ({
  error = '',
  label,
  date,
  setDate,
}) => {
  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 1 }}>
        <Typography variant="body1">{label}</Typography>
      </Grid>

      <Grid item container>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue || new Date())}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="DD/MM/YYYY"
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

export default DatePickerComponent;
