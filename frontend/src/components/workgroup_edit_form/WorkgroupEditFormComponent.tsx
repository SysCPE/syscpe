import { Grid, Tooltip, Typography } from '@mui/material';
import DatePickerComponent from 'components/date_picker/DatePickerComponent';
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
        <DatePickerComponent
          label="Início"
          date={item.creationDate}
          setDate={(date) =>
            onChange({ ...item, creationDate: date || new Date() })
          }
        />
      </Grid>
    </Grid>
  );
};

export default WorkgroupEditFormComponent;
