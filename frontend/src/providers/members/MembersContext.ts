import MemberEntity from 'domain/members/entities/MemberEntity';
import createListContext from 'providers/list/createListContext';

const MembersContext = createListContext<MemberEntity>();

export default MembersContext;
