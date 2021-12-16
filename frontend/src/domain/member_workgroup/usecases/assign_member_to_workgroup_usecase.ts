import MemberEntity from 'domain/members/entities/MemberEntity';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import workgroupsService from 'services/workgroup_service';

const assignMemberToWorkgroupUseCase = async (
  member: MemberEntity,
  workgroup: WorkgroupEntity
) => {
  await workgroupsService.assignMember(member, workgroup);
};

export default assignMemberToWorkgroupUseCase;
