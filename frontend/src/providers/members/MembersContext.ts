import MemberEntity from 'domain/members/entities/MemberEntity';
import defaultListContext from 'providers/list/defaultListContext';
import ListContextType from 'providers/list/ListContextType';
import { createContext } from 'react';

const MembersContext = createContext<ListContextType<MemberEntity>>({
  ...defaultListContext<MemberEntity>(),
});

export default MembersContext;
