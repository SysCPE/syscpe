import tokenService from 'services/token';

const verifyTokenUseCase = async (): Promise<boolean> => {
  return await tokenService.verifyToken();
};

export default verifyTokenUseCase;
