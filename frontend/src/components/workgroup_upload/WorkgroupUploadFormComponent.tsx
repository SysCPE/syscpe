import { DatePicker } from '@mui/lab';
import {
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
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
            <InputLabel id={'workgroup-creation-date-label'}>
              {/* TODO: fix color being slightly grayer than the other labels */}
              <Typography variant="body1">Data de criação</Typography>
            </InputLabel>
            <DatePicker
              value={creationDate}
              onChange={(newValue) => setCreationDate(newValue || new Date())}
              renderInput={(params) => <TextField {...params} />}
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
