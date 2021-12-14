import { TableCell, TableRow } from '@mui/material';

const MembersTableHeader = () => {
  return (
    <TableRow>
      <TableCell width="10%">IDCPE</TableCell>
      <TableCell width="30%">Nome</TableCell>
      <TableCell width="15%">Curso</TableCell>
      <TableCell width="15%" align="center">
        Departamento
      </TableCell>
      <TableCell width="10%" align="center">
        Status
      </TableCell>
      <TableCell width="20%" align="center">
        Ações
      </TableCell>
    </TableRow>
  );
};

export default MembersTableHeader;
