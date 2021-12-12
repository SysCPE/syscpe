import MemberStatusEntity from './MemberStatusEntity';

type MemberEntity = {
  idCPE: number;
  name: string;
  course: string;
  department: string;
  status: MemberStatusEntity;
  email: string;
};

export default MemberEntity;
