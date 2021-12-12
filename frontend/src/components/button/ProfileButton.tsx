import { AccountCircle, Logout } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import useAuthentication from 'providers/authentication/useAuthentication';
import { Fragment, MouseEvent, useState } from 'react';

const ProfileButton = () => {
  const { email, logout } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutButtonClick = () => {
    handleClose();
    logout();
  };

  return (
    <Fragment>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-label="profile-button"
      >
        <AccountCircle></AccountCircle>
      </IconButton>

      <Menu
        aria-labelledby="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ padding: 2 }}>
          <b>{email}</b>
        </Box>
        <MenuItem onClick={onLogoutButtonClick}>
          <Logout /> <Box sx={{ marginLeft: 1 }}>Logout</Box>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default ProfileButton;
