import { DeleteOutlined } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import LoadingIconButtonComponent from 'components/LoadingIconButtonComponent';
import MenuComponent from 'components/menu/MenuComponent';
import { useSnackbar } from 'notistack';
import ListContextType from 'providers/list/ListContextType';
import { Context, Fragment, PropsWithChildren, useContext } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

type Props<T> = {
  context: Context<ListContextType<T>>;
  warning?: JSX.Element;
  value: T;
  successMessage: string;
  failMessage: string;
};
function DeleteButtonComponent<T>({
  context,
  value,
  successMessage,
  failMessage,
  warning = <Fragment />,
}: PropsWithChildren<Props<T>>) {
  const { enqueueSnackbar } = useSnackbar();
  const { onItemDeleted, deleteItem } = useContext(context);

  const { loading, submit } = useSubmit(
    async () => delayed(deleteItem(value)),
    () => {
      enqueueSnackbar(successMessage, {
        variant: 'success',
      });
      onItemDeleted(value);
    },
    () =>
      enqueueSnackbar(failMessage, {
        variant: 'error',
      })
  );

  const onDelete = (closeMenu: VoidFunction) => () => {
    submit();
    closeMenu();
  };

  return (
    <MenuComponent
      renderMenu={(closeMenu) => (
        <MenuItem onClick={onDelete(closeMenu)}>{warning}</MenuItem>
      )}
      renderButton={(onOpen) => (
        <LoadingIconButtonComponent
          loading={loading}
          onClick={onOpen}
          icon={<DeleteOutlined fontSize="small" />}
          color="error"
        />
      )}
    />
  );
}

export default DeleteButtonComponent;
