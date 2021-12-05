import MemberStatus from './MemberStatus';

type Member = {
  idCPE: string;
  name: string;
  course: string;
  department: string;
  status: MemberStatus;
};

export default Member;
