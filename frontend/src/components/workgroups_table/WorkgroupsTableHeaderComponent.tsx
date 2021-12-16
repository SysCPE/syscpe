import { TableCell, TableRow } from '@mui/material';

const WorkgroupTableHeaderComponent = () => {
  return (
    <TableRow>
      <TableCell width="20%">Nome</TableCell>
      <TableCell width="60%">Descrição</TableCell>
      <TableCell width="20%" align="center">
        Ações
      </TableCell>
    </TableRow>
  );
};

export default WorkgroupTableHeaderComponent;
