import Routes from 'config/routes';
import HomePage from 'pages/home/HomePage';
import { Route, Switch } from 'react-router';

const AppAuthenticated = () => {
  return (
    <Switch>
      <Route path={Routes.HOME}>
        <HomePage />
      </Route>
    </Switch>
  );
};

export default AppAuthenticated;
