import MemberEntity from 'domain/members/entities/MemberEntity';
import { createContext } from 'react';

type MembersContextType = {
  members: MemberEntity[];
};
const MembersContext = createContext<MembersContextType>({
  members: [],
});

export default MembersContext;
