import { Grid, Typography } from '@mui/material';
import DetailsFormProps from 'components/details/DetailsFormProps';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import { FC } from 'react';

const WorkgroupEditFormComponent: FC<DetailsFormProps<WorkgroupEntity>> = ({
  item,
  onChange,
}) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6">{item.name}</Typography>
      </Grid>
    </Grid>
  );
};

export default WorkgroupEditFormComponent;
