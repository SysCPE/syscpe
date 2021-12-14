import MemberEntity from 'domain/members/entities/MemberEntity';
import { createContext } from 'react';

type MembersContextType = {
  onMembersCreated: (members: MemberEntity[]) => void;
  onMemberDeleted: (member: MemberEntity) => void;
  onMemberEdited: (member: MemberEntity) => void;
};
const MembersContext = createContext<MembersContextType>({
  onMembersCreated: () => {},
  onMemberDeleted: () => {},
  onMemberEdited: () => {},
});

export default MembersContext;
