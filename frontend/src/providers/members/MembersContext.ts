import MemberEntity from 'domain/members/entities/MemberEntity';
import { createContext } from 'react';

type MembersContextType = {
  members: MemberEntity[];

  loading: boolean;
  failed: boolean;
  done: boolean;
  retry: () => void;

  onMembersCreated: (members: MemberEntity[]) => void;
  onMemberDeleted: (member: MemberEntity) => void;
  onMemberEdited: (member: MemberEntity) => void;
};
const MembersContext = createContext<MembersContextType>({
  members: [],

  loading: false,
  failed: false,
  done: false,
  retry: () => {},

  onMembersCreated: () => {},
  onMemberDeleted: () => {},
  onMemberEdited: () => {},
});

export default MembersContext;
