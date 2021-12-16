import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import MemberEntity from 'domain/members/entities/MemberEntity';
import useMembers from 'providers/members/useMembers';
import { HTMLAttributes, useMemo } from 'react';

type Props<T> = {
  member: MemberEntity | null;
  setMember: (member: MemberEntity | null) => void;
  item: T;
  filterMembers: (member: MemberEntity, item: T) => boolean;
};
function MembersAutocompleteComponent<T>({
  member,
  setMember,
  item,
  filterMembers,
}: Props<T>) {
  const { items } = useMembers();
  const [options, associated] = useMemo(() => {
    const options: MemberEntity[] = [];
    const associated: MemberEntity[] = [];

    for (const member of items)
      if (filterMembers(member, item)) associated.push(member);
      else options.push(member);

    return [options, associated];
  }, [filterMembers, item, items]);

  const _renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    member: MemberEntity
  ) => {
    return (
      <Box component="li" {...props} key={member.id}>
        <Typography variant="body1">{member.name}</Typography>
      </Box>
    );
  };

  return (
    <Grid container direction="column">
      {associated.length > 0 && (
        <Grid item container direction="column" sx={{ marginBottom: 5 }}>
          <Grid item sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <b>Membros já associados</b>
            </Typography>
          </Grid>

          {associated.map((member) => (
            <Grid
              item
              container
              key={member.idCPE}
              sx={{ marginTop: 0.5 }}
              alignItems="center"
            >
              <Typography variant="body1">{member.idCPE}</Typography>
              <span
                style={{
                  margin: 8,
                  height: 24,
                  border: '1px solid rgba(0, 0, 0, 0.16)',
                }}
              ></span>
              <Typography variant="body1">{member.name}</Typography>
            </Grid>
          ))}
        </Grid>
      )}

      <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} label="Membro" />}
        renderOption={(props, option) => _renderOption(props, option)}
        getOptionLabel={(option) => option.name}
        value={member}
        onChange={(_, member) => setMember(member)}
        noOptionsText="Nenhum membro disponível"
      />
    </Grid>
  );
}

export default MembersAutocompleteComponent;
