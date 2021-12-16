import { UploadFile } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { Fragment, MouseEvent } from 'react';
import useMembersUpload from './useMembersUpload';

const MembersUploadFormComponent = () => {
  const { loading, uploadFile, file, setFile } = useMembersUpload();

  const fileSelected = !!file;

  const allowSelectSameFile = (event: MouseEvent) => {
    (event.target as HTMLInputElement).value = '';
  };

  return (
    <Fragment>
      <DialogTitle>Adicionar membros do administrativo</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item sx={{ marginBottom: 4 }}>
            <label htmlFor="users-mass-upload-button">
              <input
                id="users-mass-upload-button"
                type="file"
                accept=".csv"
                multiple={false}
                onClick={allowSelectSameFile}
                onChange={(event) => {
                  const currentTarget = event.currentTarget!;
                  const files = currentTarget.files || [];

                  if (files.length > 0) setFile(files[0]);
                }}
                style={{ display: 'none' }}
              />
              <Button
                sx={{ textTransform: 'none', marginLeft: -1 }}
                endIcon={
                  loading ? <CircularProgress size={12} /> : <UploadFile />
                }
                color="secondary"
                component="span"
                disabled={loading}
              >
                Escolher arquivo .csv com membros do administrativo
              </Button>
            </label>
          </Grid>

          <Grid item>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {file ? file.name : 'Nenhum arquivo selecionado'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ textTransform: 'none' }}
          disabled={!fileSelected || loading}
          onClick={uploadFile}
        >
          Fazer upload
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default MembersUploadFormComponent;
