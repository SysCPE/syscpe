import { DialogContent, DialogTitle, Grid } from '@mui/material';
import DatePickerComponent from 'components/date_picker/DatePickerComponent';
import LoadingButtonComponent from 'components/LoadingButtonComponent';
import TextFieldComponent from 'components/textfield/TextFieldComponent';
import { Fragment } from 'react';
import useDepartmentUpload from './useDepartmentUpload';

const DepartmentUploadFormComponent = () => {
  const {
    name,
    setName,
    creationDate,
    setCreationDate,
    onSubmit,
    error,
    loading,
  } = useDepartmentUpload();

  return (
    <Fragment>
      <DialogTitle>Adicionar departamento</DialogTitle>

      <DialogContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <TextFieldComponent
              label="Nome do departamento"
              value={name}
              onChange={setName}
              error={error}
            />
          </Grid>

          <Grid item>
            <DatePickerComponent
              label="Data de criação do departamento"
              date={creationDate}
              setDate={setCreationDate}
            />
          </Grid>

          <Grid item alignSelf="flex-end">
            <LoadingButtonComponent
              loading={loading}
              onClick={onSubmit}
              sx={{ textTransform: 'none' }}
            >
              Adicionar
            </LoadingButtonComponent>
          </Grid>
        </Grid>
      </DialogContent>
    </Fragment>
  );
};

export default DepartmentUploadFormComponent;
