import Member from 'domain/members/entities/Member';
import { createContext } from 'react';

type MembersContextType = {
  members: Member[];
};
const MembersContext = createContext<MembersContextType>({
  members: [],
});

export default MembersContext;
