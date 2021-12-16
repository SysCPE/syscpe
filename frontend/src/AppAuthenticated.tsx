import Routes from 'config/routes';
import HomePage from 'pages/home/HomePage';
import DepartmentsProvider from 'providers/departments/DepartmentsProvider';
import MembersProvider from 'providers/members/MembersProvider';
import WorkgroupProvider from 'providers/workgroups/WorkgroupProvider';
import { Route, Switch } from 'react-router';

const AppAuthenticated = () => {
  return (
    <WorkgroupProvider>
      <MembersProvider>
        <DepartmentsProvider>
          <Switch>
            <Route path={Routes.HOME}>
              <HomePage />
            </Route>
          </Switch>
        </DepartmentsProvider>
      </MembersProvider>
    </WorkgroupProvider>
  );
};

export default AppAuthenticated;
