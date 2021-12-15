import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import Header from 'components/Header';
import { SnackbarProvider } from 'notistack';
import LoadingPage from 'pages/LoadingPage';
import AuthenticationProvider from 'providers/authentication/AuthenticationProvider';
import useAuthentication from 'providers/authentication/useAuthentication';
import { BrowserRouter } from 'react-router-dom';
import SnackbarCloseButton from 'SnackbarCloseButton';
import AppAuthenticated from './AppAuthenticated';
import AppUnauthenticated from './AppUnauthenticated';

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      action={(snackbarkey) => (
        <SnackbarCloseButton snackbarKey={snackbarkey} />
      )}
    >
      <AuthenticationProvider>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Header></Header>

            <AppBody />
          </LocalizationProvider>
        </BrowserRouter>
      </AuthenticationProvider>
    </SnackbarProvider>
  );
}

const AppBody = () => {
  const { authenticated, loading } = useAuthentication();

  if (loading) return <LoadingPage />;
  if (!authenticated) return <AppUnauthenticated />;

  return <AppAuthenticated />;
};

export default App;
