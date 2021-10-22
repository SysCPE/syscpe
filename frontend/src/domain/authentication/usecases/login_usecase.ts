import InvalidCredentials from 'domain/authentication/errors/InvalidCredentials';
import User from 'domain/user/entities/User';
import authenticationService from 'services/authentication';

const loginUseCase = async (email: string, password: string): Promise<User> => {
  await authenticationService.login(email, password);
  throw new InvalidCredentials();
};

export type LoginUseCase = typeof loginUseCase;

export default loginUseCase;
