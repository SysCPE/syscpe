import axios from 'axios';
import MemberEntity from 'domain/members/entities/MemberEntity';

const memberService = {
  listMembers: async (): Promise<MemberEntity[]> => {
    const ROUTE = '/members/admin/';

    const response = await axios.get(ROUTE);

    return [];
  },
};

export default memberService;
