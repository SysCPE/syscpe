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
  TableCell as MuiTableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MembersUploadModalComponent from 'components/members_upload/MembersUploadModalComponent';
import MemberDeleteMenuComponent from 'components/member_delete/MemberDeleteMenuComponent';
import MemberDetailsModalComponent from 'components/member_details/MemberDetailsModalComponent';
import useMembers from 'providers/members/useMembers';
import { FC } from 'react';
import MembersTableEmptyWarningComponent from './MembersTableEmptyWarningComponent';
import MembersTableStatusCellComponent from './MembersTableStatusCellComponent';

const TableCell: FC<TableCellProps> = (props) => {
  const { children } = props;

  return (
    <MuiTableCell sx={{ border: 0 }} {...props}>
      {children}
    </MuiTableCell>
  );
};
const MembersTableComponent = () => {
  const { done, members, loading, failed, retry } = useMembers();
  const noMembersRegistered = members.length === 0;

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
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <MuiTableCell width="10%">IDCPE</MuiTableCell>
                    <MuiTableCell width="30%">Nome</MuiTableCell>
                    <MuiTableCell width="15%">Curso</MuiTableCell>
                    <MuiTableCell width="15%" align="center">
                      Departamento
                    </MuiTableCell>
                    <MuiTableCell width="10%" align="center">
                      Status
                    </MuiTableCell>
                    <MuiTableCell width="20%" align="center">
                      Ações
                    </MuiTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {done &&
                    members.map((member) => (
                      <Fade key={member.idCPE} in={true}>
                        <TableRow key={member.idCPE}>
                          <TableCell width="10%">{member.idCPE}</TableCell>
                          <TableCell width="30%">{member.name}</TableCell>
                          <TableCell width="15%">{member.course}</TableCell>
                          <TableCell width="15%" align="center">
                            {member.department}
                          </TableCell>
                          <TableCell width="10%" align="center">
                            <MembersTableStatusCellComponent
                              status={member.status}
                            />
                          </TableCell>
                          <TableCell width="20%" align="center">
                            <Grid container justifyContent="center" spacing={0}>
                              <MemberDetailsModalComponent member={member} />

                              <div style={{ margin: 8 }}></div>

                              <MemberDeleteMenuComponent member={member} />
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid container sx={{ flexGrow: 1 }} alignContent="center">
            <Fade in={loading} exit={false} unmountOnExit>
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            </Fade>

            <Fade in={done && noMembersRegistered} exit={false} unmountOnExit>
              <Grid container justifyContent="center">
                <MembersTableEmptyWarningComponent />
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
                    Carregamento de membros falhou
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

        <MembersUploadModalComponent
          render={(onOpen) => {
            return (
              <Grow in={done}>
                <Fab
                  onClick={onOpen}
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
            );
          }}
        />
      </Paper>
    </Grow>
  );
};

export default MembersTableComponent;
