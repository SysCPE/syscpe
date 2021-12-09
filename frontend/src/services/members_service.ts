import axios from 'axios';
import MemberEntity from 'domain/members/entities/MemberEntity';
import MemberStatusEntity from 'domain/members/entities/MemberStatusEntity';

type AdminMemberData = {
  idCPE: number;
  CPF: string;
  RG: string;
  birthday: string;
  eachCourse: string;
  name: string;
  isActive: string;
};

const _mapStatusDataToEntity = (status: string): MemberStatusEntity => {
  if (['ACTIVE', 'INACTIVE', 'TIMEOFF'].includes(status))
    return status as MemberStatusEntity;

  throw new Error(`${status} is not a valid value for MemberStatusEntity`);
};

const memberService = {
  listMembers: async (): Promise<MemberEntity[]> => {
    const ROUTE = '/members/admin/';

    const response = await axios.get(ROUTE);
    const usersData = response.data.users as AdminMemberData[];

    return usersData.map((userData) => ({
      idCPE: userData.idCPE.toString(),
      name: userData.name,
      course: userData.eachCourse,
      department: '',
      status: _mapStatusDataToEntity(userData.isActive),
    }));
  },
};

export default memberService;
