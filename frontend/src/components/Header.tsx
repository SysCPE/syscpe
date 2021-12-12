import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import APP_NAME from 'config/app_name';
import Routes from 'config/routes';
import useAuthentication from 'providers/authentication/useAuthentication';
import { Link } from 'react-router-dom';
import LoginButton from './button/LoginButton';
import ProfileButton from './button/ProfileButton';

const Header = () => {
  const { authenticated } = useAuthentication();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={11} md={10} lg={9}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to={Routes.HOME}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <b>{APP_NAME}</b>
                </Link>
              </Typography>

              {!authenticated && <LoginButton />}
              {authenticated && <ProfileButton />}
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Header;
