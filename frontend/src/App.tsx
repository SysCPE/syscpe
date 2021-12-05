import Header from 'components/Header';
import LoadingPage from 'pages/LoadingPage';
import AuthenticationProvider from 'providers/authentication/AuthenticationProvider';
import useAuthentication from 'providers/authentication/useAuthentication';
import { BrowserRouter } from 'react-router-dom';
import AppAuthenticated from './AppAuthenticated';
import AppUnauthenticated from './AppUnauthenticated';

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Header></Header>

        <AppBody />
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

const AppBody = () => {
  const { authenticated, loading } = useAuthentication();

  if (loading) return <LoadingPage />;
  if (!authenticated) return <AppUnauthenticated />;

  return <AppAuthenticated />;
};

export default App;
