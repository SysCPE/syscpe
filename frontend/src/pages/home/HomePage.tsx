import AdminPanel from 'components/admin_panel/AdminPanel';
import Page from 'pages/Page';
import useAuthentication from 'providers/authentication/useAuthentication';
import { FC } from 'react';

const HomePage: FC = () => {
  const { authenticated } = useAuthentication();

  if (!authenticated)
    return (
      <Page>
        <div>Please login</div>
      </Page>
    );

  return (
    <Page>
      <AdminPanel />
    </Page>
  );
};

export default HomePage;
