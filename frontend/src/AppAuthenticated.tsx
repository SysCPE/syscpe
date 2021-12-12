import Routes from 'config/routes';
import HomePage from 'pages/home/HomePage';
import MembersProvider from 'providers/members/MembersProvider';
import { Route, Switch } from 'react-router';

const AppAuthenticated = () => {
  return (
    <MembersProvider>
      <Switch>
        <Route path={Routes.HOME}>
          <HomePage />
        </Route>
      </Switch>
    </MembersProvider>
  );
};

export default AppAuthenticated;
