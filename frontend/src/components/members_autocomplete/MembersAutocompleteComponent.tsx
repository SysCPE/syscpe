import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import MemberEntity from 'domain/members/entities/MemberEntity';
import useMembers from 'providers/members/useMembers';
import { FC, HTMLAttributes } from 'react';

type Props = {
  member: MemberEntity | null;
  setMember: (member: MemberEntity | null) => void;
  includeLabel?: boolean;
};
const MembersAutocompleteComponent: FC<Props> = ({
  member,
  setMember,
  includeLabel = true,
}) => {
  const { items } = useMembers();

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
    <Autocomplete
      options={items}
      renderInput={(params) => (
        <TextField {...params} label={includeLabel ? 'Membro' : ''} />
      )}
      renderOption={(props, option) => _renderOption(props, option)}
      getOptionLabel={(option) => option.name}
      value={member}
      onChange={(_, member) => setMember(member)}
      noOptionsText="Nenhum membro disponível"
    />
  );
};

export default MembersAutocompleteComponent;
