import MemberEntity from 'domain/members/entities/MemberEntity';
import AdminMemberData from './admin_member_data';
import mapMemberStatusDataToEntity from './map_member_status_data_to_entity';

const mapAdminMemberDataToEntity = (
  adminMember: AdminMemberData
): MemberEntity => {
  return {
    idCPE: adminMember.idCPE,
    email: adminMember.email,
    name: adminMember.name,

    status: mapMemberStatusDataToEntity(adminMember.status),
    department: adminMember.departmentName || '',
    workgroups: adminMember.workgroups,

    // TODO: properly deal with missing fields
    CPF: adminMember.CPF,
    RG: adminMember.RG,
    pronoun: adminMember.pronoun,
    socialName: adminMember.socialName,
    birthday: new Date(adminMember.birthday),

    course: adminMember.course || '',
    semester: adminMember.semester,
    period: adminMember.period,
  };
};

export default mapAdminMemberDataToEntity;
