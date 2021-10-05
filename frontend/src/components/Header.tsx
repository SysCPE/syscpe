import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import APP_NAME from 'config/app_name';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={6}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <b>{APP_NAME}</b>
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Header;
