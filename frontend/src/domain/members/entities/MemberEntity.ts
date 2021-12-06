import MemberStatusEntity from './MemberStatusEntity';

type MemberEntity = {
  idCPE: string;
  name: string;
  course: string;
  department: string;
  status: MemberStatusEntity;
};

export default MemberEntity;
