type MemberEntity = {
  idCPE?: number;

  email: string;
  name: string;

  RG?: string;
  CPF?: string;

  socialName?: string;
  gender?: string;
  birthday?: Date;
  phone?: string;
  
  isActive?: boolean;
};

export default MemberEntity;
