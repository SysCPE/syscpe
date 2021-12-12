import MemberEntity from 'domain/members/entities/MemberEntity';
import memberService from 'services/members_service';

const listMembersUseCase = async (): Promise<MemberEntity[]> => {
  return memberService.listMembers();
};

export default listMembersUseCase;
