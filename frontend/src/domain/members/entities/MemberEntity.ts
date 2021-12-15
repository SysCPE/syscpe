import MemberStatusEntity from './MemberStatusEntity';

type MemberEntity = {
  idCPE: number;
  email: string;
  name: string;

  status: MemberStatusEntity;
  department: string;
  workgroups: string[];

  CPF: string;
  RG: string;
  pronoun: string;
  socialName: string;
  birthday: string;

  course: string;
  semester: number;
  period: string;
};

export default MemberEntity;
