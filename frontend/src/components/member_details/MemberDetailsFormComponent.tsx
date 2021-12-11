import { Grid, Tooltip, Typography } from '@material-ui/core';
import TextFieldComponent from 'components/textfield/TextFieldComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { FC } from 'react';

type Props = {
  member: MemberEntity;
  onChange: (member: MemberEntity) => void;
};
const MemberDetailsFormComponent: FC<Props> = ({ member, onChange }) => {
  return (
    <Grid container direction="column">
      <Grid item container sx={{ marginBottom: 5 }} alignItems="center">
        <Tooltip title="IDCPE">
          <Typography variant="body1">{member.idCPE}</Typography>
        </Tooltip>
        <span
          style={{ margin: 8, height: 24, border: '1px solid #111111' }}
        ></span>
        <Tooltip title="Email">
          <Typography variant="body1">{member.email}</Typography>
        </Tooltip>
      </Grid>

      <Grid item container>
        <TextFieldComponent
          label={'Nome'}
          value={member.name}
          onChange={(value) => onChange({ ...member, name: value })}
        />
      </Grid>
    </Grid>
  );
};

export default MemberDetailsFormComponent;
