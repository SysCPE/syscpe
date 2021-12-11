import MemberEntity from 'domain/members/entities/MemberEntity';
import { createContext } from 'react';

type MembersContextType = {
  members: MemberEntity[];

  loading: boolean;
  failed: boolean;
  done: boolean;
  retry: () => void;

  onMemberDeleted: (member: MemberEntity) => void;
};
const MembersContext = createContext<MembersContextType>({
  members: [],

  loading: false,
  failed: false,
  done: false,
  retry: () => {},

  onMemberDeleted: () => {},
});

export default MembersContext;
