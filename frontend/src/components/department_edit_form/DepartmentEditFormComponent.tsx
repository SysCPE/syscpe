import { Grid, Typography } from '@mui/material';
import DatePickerComponent from 'components/date_picker/DatePickerComponent';
import DetailsFormProps from 'components/details/DetailsFormProps';
import MembersAutocompleteComponent from 'components/members_autocomplete/MembersAutocompleteComponent';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import useMembers from 'providers/members/useMembers';
import { FC } from 'react';

const DeparmentEditFormComponent: FC<DetailsFormProps<DepartmentEntity>> = ({
  item,
  onChange,
}) => {
  const { items: members } = useMembers();
  
  // TODO: move this function somewhere where it can be shared
  const _getAdminMemberEntityById = (id?: number) => {
    if (!id) return null;
    return members.find((member) => member.idCPE === id) || null;
  };

  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 5 }} alignItems="center">
        <Typography variant="h6">{item.name}</Typography>
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <DatePickerComponent
          label="Data de criação"
          date={item.creationDate}
          setDate={(date) =>
            onChange({ ...item, creationDate: date || new Date() })
          }
        />
      </Grid>

      <Grid item container direction="column" sx={{ marginBottom: 2 }}>
        <Grid item container sx={{ marginBottom: 1 }}>
          <Typography variant="body1">Diretor</Typography>
        </Grid>

        <MembersAutocompleteComponent
          member={_getAdminMemberEntityById(item.directorId)}
          setMember={(member) =>
            onChange({ ...item, directorId: member?.idCPE || -1 })
          }
          includeLabel={false}
        />
      </Grid>

      <Grid item container direction="column">
        <Grid item container sx={{ marginBottom: 1 }}>
          <Typography variant="body1">Vice-Diretor</Typography>
        </Grid>

        <MembersAutocompleteComponent
          member={_getAdminMemberEntityById(item.viceDirectorId)}
          setMember={(member) =>
            onChange({ ...item, viceDirectorId: member?.idCPE || -1 })
          }
          includeLabel={false}
        />
      </Grid>
    </Grid>
  );
};

export default DeparmentEditFormComponent;
