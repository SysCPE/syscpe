import MemberEntity from 'domain/members/entities/MemberEntity';
import memberService from 'services/members_service';

const editMemberUseCase = async (member: MemberEntity) => {
  await memberService.editMeber(member);
};

export default editMemberUseCase;
