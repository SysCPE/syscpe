import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import MemberEntity from 'domain/members/entities/MemberEntity';
import departmentsService from 'services/departments_service';

const associateMemberWithDepartment = async (
  member: MemberEntity,
  department: DepartmentEntity
) => {
  await departmentsService.associateMember(member, department);
};

export default associateMemberWithDepartment;
