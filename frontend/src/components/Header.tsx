import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import APP_NAME from 'config/app_name';
import Routes from 'config/routes';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={6}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to={Routes.HOME}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <b>{APP_NAME}</b>
                </Link>
              </Typography>

              <Button>
                <Link
                  to={Routes.LOGIN}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Login
                </Link>
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Header;
