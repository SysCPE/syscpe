import { TableCell, TableRow } from '@mui/material';

const DepartmentsTableHeaderComponent = () => {
  return (
    <TableRow>
      <TableCell width="20%">Nome</TableCell>
      <TableCell width="20%">Diretor</TableCell>
      <TableCell width="20%">Vice-Diretor</TableCell>
      <TableCell width="20">Descrição</TableCell>
      <TableCell width="20%" align="center">
        Ações
      </TableCell>
    </TableRow>
  );
};

export default DepartmentsTableHeaderComponent;
