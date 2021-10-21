import User from 'domain/user/entities/User';

type AuthenticationService = {
  login: (email: string, password: string) => Promise<User>;
};

export default AuthenticationService;
