import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import MemberEntity from 'domain/members/entities/MemberEntity';
import useMembers from 'providers/members/useMembers';
import { HTMLAttributes } from 'react';

const MembersAutocompleteComponent = () => {
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
      renderInput={(params) => <TextField {...params} label="Membro" />}
      renderOption={(props, option) => _renderOption(props, option)}
      getOptionLabel={(option) => option.name}
    />
  );
};

export default MembersAutocompleteComponent;
