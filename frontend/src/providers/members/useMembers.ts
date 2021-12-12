import { useContext } from 'react';
import MembersContext from './MembersContext';

const useMembers = () => {
  return useContext(MembersContext);
};

export default useMembers;
