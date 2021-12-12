import MemberEntity from 'domain/members/entities/MemberEntity';
import userService from 'services/user_service';

const uploadUsersCSVUseCase = async (csv: File): Promise<MemberEntity[]> => {
  return await userService.uploadCSV(csv);
};

export default uploadUsersCSVUseCase;
