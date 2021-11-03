import { Grid } from '@material-ui/core';
import Header from 'components/Header';
import Routes from 'config/routes';
import HomePage from 'pages/home/HomePage';
import LoadingPage from 'pages/LoadingPage';
import LoginPage from 'pages/login/LoginPage';
import AuthenticationProvider from 'providers/authentication/AuthenticationProvider';
import useAuthentication from 'providers/authentication/useAuthentication';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Header></Header>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={6}>
            <AppBody />
          </Grid>
        </Grid>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

const AppBody = () => {
  const { loading } = useAuthentication();

  if (loading) return <LoadingPage />;

  return (
    <Switch>
      <Route path={Routes.LOGIN}>
        <LoginPage />
      </Route>

      <Route path={Routes.HOME}>
        <HomePage />
      </Route>
    </Switch>
  );
};

export default App;
