import { Add, Replay } from '@mui/icons-material';
import {
  CircularProgress,
  Fab,
  Fade,
  Grid,
  Grow,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import ListContextType from 'providers/list/ListContextType';
import { Context, PropsWithChildren, useContext } from 'react';
import TableEmptyWarningComponent from './TableEmptyWarning';

type Props<T> = {
  listContext: Context<ListContextType<T>>;
  header: JSX.Element;
  renderItem: (item: T) => JSX.Element;
  emptyListWarning: string;
  failedMessage: string;
  onAddButtonClick: () => void;
};
function TableComponent<T>({
  listContext,
  header,
  renderItem,
  emptyListWarning,
  failedMessage,
  onAddButtonClick,
}: PropsWithChildren<Props<T>>) {
  const { loading, done, items, failed, retry } = useContext(listContext);
  const emptyList = items.length === 0;

  return (
    <Grow in={true} exit={false}>
      <Paper
        elevation={5}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          minHeight: 400,
          maxHeight: 880,
          paddingBottom: 10,
          height: '100%',
        }}
      >
        <Grid container direction="column" sx={{ height: '100%' }}>
          <TableContainer>
            <Table>
              <TableHead>{header}</TableHead>

              {done && !emptyList && (
                <TableBody>{items.map(renderItem)}</TableBody>
              )}
            </Table>
          </TableContainer>

          <Grid container sx={{ flexGrow: 1 }} alignContent="center">
            <Fade in={loading} exit={false} unmountOnExit>
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            </Fade>

            <Fade in={done && emptyList} exit={false} unmountOnExit>
              <Grid container justifyContent="center">
                <TableEmptyWarningComponent message={emptyListWarning} />
              </Grid>
            </Fade>

            <Fade in={failed} exit={false} unmountOnExit>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignContent="center"
                justifyItems="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ textAlign: 'center' }}
                  >
                    {failedMessage}
                  </Typography>
                </Grid>

                <Grid item>
                  <IconButton onClick={retry}>
                    <Replay />
                  </IconButton>
                </Grid>
              </Grid>
            </Fade>
          </Grid>
        </Grid>

        <Grow in={done}>
          <Fab
            onClick={onAddButtonClick}
            color="secondary"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              margin: 1,
            }}
          >
            <Add />
          </Fab>
        </Grow>
      </Paper>
    </Grow>
  );
}

export default TableComponent;
