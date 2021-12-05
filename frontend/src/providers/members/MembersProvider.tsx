import Member from 'domain/members/entities/Member';
import { FC, useState } from 'react';
import MembersContext from './MembersContext';

const MembersProvider: FC = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([]);

  return (
    <MembersContext.Provider value={{ members }}>
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
