import { DialogContent, DialogTitle, Grid } from '@mui/material';
import DatePickerComponent from 'components/date_picker/DatePickerComponent';
import LoadingButtonComponent from 'components/LoadingButtonComponent';
import TextFieldComponent from 'components/textfield/TextFieldComponent';
import { Fragment } from 'react';
import useWorkgroupUpload from './useWorkgroupUpload';

const WorkgroupUploadFormComponent = () => {
  const {
    name,
    description,
    creationDate,
    setName,
    setDescription,
    setCreationDate,
    onSubmit,
    error,
    loading,
  } = useWorkgroupUpload();

  return (
    <Fragment>
      <DialogTitle>Adicionar Grupo de Trabalho</DialogTitle>

      <DialogContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <TextFieldComponent
              label="Nome"
              value={name}
              onChange={setName}
              error={error}
            />
          </Grid>

          <Grid item>
            <TextFieldComponent
              label="Descrição"
              value={description}
              onChange={setDescription}
            />
          </Grid>

          <Grid item>
            <DatePickerComponent
              label="Data de criação"
              date={creationDate}
              setDate={(date) => setCreationDate(date || new Date())}
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

export default WorkgroupUploadFormComponent;
