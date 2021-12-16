import AdminPanel from 'components/admin_panel/AdminPanel';
import Page from 'pages/Page';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <Page>
      <AdminPanel />
    </Page>
  );
};

export default HomePage;
