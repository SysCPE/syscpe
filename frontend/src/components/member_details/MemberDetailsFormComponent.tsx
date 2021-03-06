import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import DatePickerComponent from 'components/date_picker/DatePickerComponent';
import TextFieldComponent from 'components/textfield/TextFieldComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import MemberStatusEntity from 'domain/members/entities/MemberStatusEntity';
import { FC } from 'react';

type Props = {
  item: MemberEntity;
  onChange: (member: MemberEntity) => void;
};
const MemberDetailsFormComponent: FC<Props> = ({ item, onChange }) => {
  const member = item;

  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 5 }} alignItems="center">
        <Tooltip title="IDCPE">
          <Typography variant="body1">{member.idCPE}</Typography>
        </Tooltip>
        <span
          style={{
            margin: 8,
            height: 24,
            border: '1px solid rgba(0, 0, 0, 0.16)',
          }}
        ></span>
        <Tooltip title="Email">
          <Typography variant="body1">{member.email}</Typography>
        </Tooltip>
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'Nome'}
          value={member.name}
          onChange={(value) => onChange({ ...member, name: value })}
        />
      </Grid>

      <Grid item container direction="column" sx={{ marginBottom: 2 }}>
        <InputLabel id={'member-status-label'}>
          {/* TODO: fix color being slightly grayer than the other labels */}
          <Typography variant="body1">Situação</Typography>
        </InputLabel>
        <Select
          labelId={'member-status-label'}
          value={member.status}
          onChange={(event) =>
            onChange({
              ...member,
              status: event.target.value as MemberStatusEntity,
            })
          }
        >
          <MenuItem value={'ACTIVE' as MemberStatusEntity}>Ativo</MenuItem>
          <MenuItem value={'TIMEOFF' as MemberStatusEntity}>Afastado</MenuItem>
          <MenuItem value={'INACTIVE' as MemberStatusEntity}>
            Desligado
          </MenuItem>
        </Select>
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'RG'}
          value={member.RG}
          onChange={(value) => onChange({ ...member, RG: value })}
        />
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'CPF'}
          value={member.CPF}
          onChange={(value) => onChange({ ...member, CPF: value })}
        />
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'Pronome'}
          value={member.pronoun}
          onChange={(value) => onChange({ ...member, pronoun: value })}
        />
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'Nome social'}
          value={member.socialName}
          onChange={(value) => onChange({ ...member, socialName: value })}
        />
      </Grid>

      <Grid item container sx={{ marginBottom: 2 }}>
        <TextFieldComponent
          label={'Curso'}
          value={member.course}
          onChange={(value) => onChange({ ...member, course: value })}
        />
      </Grid>

      <Grid item container direction="column" sx={{ marginBottom: 2 }}>
        <InputLabel id={'member-semester-label'}>
          {/* TODO: fix color being slightly grayer than the other labels */}
          <Typography variant="body1">Semestre</Typography>
        </InputLabel>
        <Select
          labelId={'member-semester-label'}
          value={member.semester}
          onChange={(event) =>
            onChange({
              ...member,
              semester: event.target.value as number,
            })
          }
        >
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <MenuItem key={i} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
        </Select>
      </Grid>

      <Grid item container direction="column" sx={{ marginBottom: 2 }}>
        <DatePickerComponent
          label="Data de nascimento"
          date={member.birthday}
          setDate={(date) =>
            onChange({ ...member, birthday: date || new Date() })
          }
        />
      </Grid>
    </Grid>
  );
};

export default MemberDetailsFormComponent;
