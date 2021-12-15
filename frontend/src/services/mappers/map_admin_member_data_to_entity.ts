import MemberEntity from 'domain/members/entities/MemberEntity';
import AdminMemberData from './admin_member_data';
import mapMemberStatusDataToEntity from './map_member_status_data_to_entity';

const mapAdminMemberDataToEntity = (
  adminMember: AdminMemberData
): MemberEntity => {
  return {
    idCPE: adminMember.idCPE,
    name: adminMember.name,
    course: adminMember.course,
    department: '',
    status: mapMemberStatusDataToEntity(adminMember.status),
    email: adminMember.email,
  };
};

export default mapAdminMemberDataToEntity;
