import AuthenticationService from './authentication_service';

const authenticationService: AuthenticationService = {
  login: async (email, password) => {
    console.log('SERVICE', email, password);
    return {
      email,
      name: 'USER NAME',
    };
  },
};

export default authenticationService;
