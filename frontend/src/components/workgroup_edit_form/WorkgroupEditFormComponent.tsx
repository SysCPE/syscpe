import { DatePicker } from '@mui/lab';
import {
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DetailsFormProps from 'components/details/DetailsFormProps';
import TextFieldComponent from 'components/textfield/TextFieldComponent';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import { FC } from 'react';

const WorkgroupEditFormComponent: FC<DetailsFormProps<WorkgroupEntity>> = ({
  item,
  onChange,
}) => {
  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 5 }} alignItems="center">
        <Tooltip title="Nome">
          <Typography variant="h6">{item.name}</Typography>
        </Tooltip>
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'Descrição'}
          value={item.description}
          onChange={(value) => onChange({ ...item, description: value })}
        />
      </Grid>

      <Grid item container direction="column" sx={{ marginBottom: 2 }}>
        <InputLabel id={'workgroup-edit-start-date-label'}>
          {/* TODO: fix color being slightly grayer than the other labels */}
          <Typography variant="body1">Início</Typography>
        </InputLabel>
        <DatePicker
          value={item.creationDate}
          onChange={(newValue) =>
            onChange({ ...item, creationDate: newValue || new Date() })
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </Grid>
  );
};

export default WorkgroupEditFormComponent;
