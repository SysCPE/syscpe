import { Grid } from '@material-ui/core';
import Header from 'components/Header';
import Routes from 'config/routes';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <Switch>
            <Route path={Routes.LOGIN}>
              <LoginPage></LoginPage>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
