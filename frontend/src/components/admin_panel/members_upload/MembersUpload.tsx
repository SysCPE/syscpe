import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
} from '@material-ui/core';
import { UploadFile } from '@material-ui/icons';
import { MouseEvent } from 'react';
import useMembersUpload from './useMembersUpload';

const MembersUpload = () => {
  const {
    done,
    loading,
    uploadFile,
    usersCreated,
    closeDoneDialog,
    failed,
    closeFailedDialog,
  } = useMembersUpload();

  const allowSelectSameFile = (event: MouseEvent) => {
    (event.target as HTMLInputElement).value = '';
  };

  return (
    <Grid container direction="column" alignContent="flex-end">
      <Grid item>
        <label htmlFor="users-mass-upload-button">
          <input
            id="users-mass-upload-button"
            type="file"
            style={{ display: 'none' }}
            accept=".csv"
            multiple={false}
            onChange={(event) => {
              const currentTarget = event.currentTarget!;
              const files = currentTarget.files || [];

              if (files.length > 0) uploadFile(files[0]);
            }}
            onClick={allowSelectSameFile}
          />
          <Button
            sx={{ textTransform: 'none' }}
            endIcon={loading ? <CircularProgress size={12} /> : <UploadFile />}
            component="span"
            disabled={loading}
          >
            Fazer upload de membros administrativo
          </Button>
        </label>
      </Grid>

      <Snackbar open={done} autoHideDuration={4000} onClose={closeDoneDialog}>
        <Alert
          onClose={closeDoneDialog}
          severity="success"
        >{`${usersCreated} membros adicionados`}</Alert>
      </Snackbar>

      <Snackbar
        open={failed}
        autoHideDuration={4000}
        onClose={closeFailedDialog}
      >
        <Alert onClose={closeFailedDialog} severity="error">
          Ocorreu um erro na hora de adicionar novos membros
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default MembersUpload;
