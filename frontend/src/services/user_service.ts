import axios from 'axios';
import MemberEntity from 'domain/members/entities/MemberEntity';
import AdminMemberData from './mappers/admin_member_data';
import mapAdminMemberDataToEntity from './mappers/map_admin_member_data_to_entity';

const userService = {
  uploadCSV: async (csv: File): Promise<MemberEntity[]> => {
    const form = new FormData();
    form.append('users', csv);

    const response = await axios.post('members/admin/upload-users', form);
    const usersData = response.data.created_users as AdminMemberData[];

    return usersData.map(mapAdminMemberDataToEntity);
  },
};

export default userService;
