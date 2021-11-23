import userService from 'services/user_service';

const uploadUsersCSVUseCase = async (csv: File): Promise<number> => {
  return await userService.uploadCSV(csv);
};

export default uploadUsersCSVUseCase;
