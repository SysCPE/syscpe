import MemberEntity from 'domain/members/entities/MemberEntity';

type WithMemberAssociationContextType<T> = {
  associateMember: (member: MemberEntity, item: T) => Promise<void>;
};

export default WithMemberAssociationContextType;
