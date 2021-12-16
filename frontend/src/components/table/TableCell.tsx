import { TableCell as MuiTableCell, TableCellProps } from '@mui/material';
import { FC } from 'react';

const TableCell: FC<TableCellProps> = (props) => {
  const { children } = props;

  return (
    <MuiTableCell sx={{ border: 0 }} {...props}>
      {children}
    </MuiTableCell>
  );
};

export default TableCell;
