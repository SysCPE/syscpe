import MemberEntity from 'domain/members/entities/MemberEntity';
import createListContext from 'providers/list/createListContext';

const MembersListContext = createListContext<MemberEntity>();

export default MembersListContext;
