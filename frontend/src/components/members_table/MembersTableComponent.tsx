import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import useMembers from 'providers/members/useMembers';
import MembersTableEmptyWarningComponent from './MembersTableEmptyWarningComponent';
import MembersTableStatusCellComponent from './MembersTableStatusCellComponent';

const MembersTableComponent = () => {
  const { members } = useMembers();
  const noMembersRegistered = members.length === 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IDCPE</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell align="center">Departamento</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.idCPE}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {member.idCPE}
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.course}</TableCell>
                <TableCell align="center">{member.department}</TableCell>
                <TableCell align="center">
                  <MembersTableStatusCellComponent status={member.status} />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>

          {noMembersRegistered && (
            <TableRow>
              <TableCell colSpan={6}>
                <MembersTableEmptyWarningComponent />
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MembersTableComponent;
