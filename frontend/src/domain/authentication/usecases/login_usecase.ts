import InvalidCredentials from 'domain/authentication/errors/InvalidCredentials';

const loginUseCase = async (email: string, password: string) => {
  throw new InvalidCredentials();
};

export type LoginUseCase = typeof loginUseCase;

export default loginUseCase;
