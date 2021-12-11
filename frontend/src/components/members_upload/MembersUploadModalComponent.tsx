import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { UploadFile } from '@material-ui/icons';
import { FC, Fragment, MouseEvent, useState } from 'react';
import useMembersUpload from './useMembersUpload';

type Props = {
  render: (onOpen: () => void) => JSX.Element;
};
const MembersUploadModalComponent: FC<Props> = ({ render }) => {
  const { loading, uploadFile, file, setFile } = useMembersUpload();
  const [open, setOpen] = useState(false);

  const fileSelected = !!file;

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const allowSelectSameFile = (event: MouseEvent) => {
    (event.target as HTMLInputElement).value = '';
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="lg">
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
      </Dialog>

      {render(openDialog)}
    </Fragment>
  );
};

export default MembersUploadModalComponent;
