import MemberEntity from 'domain/members/entities/MemberEntity';
import memberService from 'services/members_service';

const deleteMemberUseCase = async (member: MemberEntity) => {
  await memberService.deleteMember(member.idCPE);
};

export default deleteMemberUseCase;
