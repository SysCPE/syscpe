import { Grid, Typography } from '@mui/material';
import DetailsFormProps from 'components/details/DetailsFormProps';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import { FC } from 'react';

const DeparmentEditFormComponent: FC<DetailsFormProps<DepartmentEntity>> = ({
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

export default DeparmentEditFormComponent;
