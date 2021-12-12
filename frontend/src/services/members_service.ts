import axios from 'axios';
import MemberEntity from 'domain/members/entities/MemberEntity';
import AdminMemberData from './mappers/admin_member_data';
import mapAdminMemberDataToEntity from './mappers/map_admin_member_data_to_entity';

const memberService = {
  listMembers: async (): Promise<MemberEntity[]> => {
    const ROUTE = '/members/admin/';

    const response = await axios.get(ROUTE);
    const usersData = response.data.users as AdminMemberData[];

    return usersData.map(mapAdminMemberDataToEntity);
  },
  editMeber: async (member: MemberEntity) => {
    const ROUTE = '/members/admin/edit-member';
    const { idCPE } = member;

    const memberData: any = { ...member };
    delete memberData.idCPE;

    await axios.post(ROUTE, {
      idCPE,
      data: memberData,
    });
  },
  deleteMember: async (idCPE: number) => {
    const ROUTE = '/members/admin/delete-member';

    await axios.post(ROUTE, { idCPE });
  },
};

export default memberService;
