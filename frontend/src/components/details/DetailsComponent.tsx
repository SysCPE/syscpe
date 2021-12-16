import { Close, Info, Save } from '@mui/icons-material';
import {
  CircularProgress,
  DialogContent,
  Fab,
  Grow,
  IconButton,
  Tooltip,
} from '@mui/material';
import DialogComponent from 'components/dialog/DialogComponent';
import { useSnackbar } from 'notistack';
import ListContextType from 'providers/list/ListContextType';
import { ComponentType, Context, useContext, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';
import DetailsFormProps from './DetailsFormProps';

type Props<T> = {
  item: T;
  context: Context<ListContextType<T>>;
  failMessage: string;
  sucessMessage: string;
  Form: ComponentType<DetailsFormProps<T>>;
};
function DetailsComponent<T>({
  item,
  context,
  sucessMessage,
  failMessage,
  Form,
}: Props<T>) {
  const { onItemEdited, editItem } = useContext(context);
  const { enqueueSnackbar } = useSnackbar();
  const [currentItem, setCurrentItem] = useState<T>(item);
  const { loading, submit } = useSubmit(
    async () => delayed(editItem(currentItem)),
    () => {
      enqueueSnackbar(sucessMessage, { variant: 'success' });
      onItemEdited(currentItem);
    },
    () =>
      enqueueSnackbar(failMessage, {
        variant: 'error',
      })
  );

  const hasChanged = JSON.stringify(currentItem) !== JSON.stringify(item);

  const saveMember = () => {
    if (!hasChanged) return;
    submit();
  };

  return (
    <DialogComponent
      maxWidth="sm"
      onClose={() => setCurrentItem(item)}
      body={(closeDialog) => {
        return (
          <DialogContent sx={{ height: '80vh', position: 'relative' }}>
            <IconButton
              onClick={closeDialog}
              sx={{ position: 'absolute', right: 0, top: 0, margin: 1 }}
            >
              <Close />
            </IconButton>

            <Form onChange={setCurrentItem} item={currentItem} />

            <Grow in={hasChanged}>
              <Tooltip title="Salvar mudanças" placement="left">
                <Fab
                  color="secondary"
                  sx={{ position: 'absolute', right: 0, bottom: 0, margin: 2 }}
                  onClick={saveMember}
                >
                  {loading && (
                    <CircularProgress sx={{ position: 'absolute' }} />
                  )}
                  <Save />
                </Fab>
              </Tooltip>
            </Grow>
          </DialogContent>
        );
      }}
      renderButton={(openDialog) => (
        <Tooltip title="Ver dados">
          <IconButton color="secondary" size="small" onClick={openDialog}>
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}

export default DetailsComponent;
