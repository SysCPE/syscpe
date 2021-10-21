import LoginComponent from 'components/login/LoginComponent';
import Page from 'pages/Page';
import useLoginPage from './useLoginPage';

const LoginPage = () => {
  const { error, loading, onSubmit } = useLoginPage();

  return (
    <Page>
      <LoginComponent
        error={error}
        loading={loading}
        submit={onSubmit}
      ></LoginComponent>
    </Page>
  );
};

export default LoginPage;
