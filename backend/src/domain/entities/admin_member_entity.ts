import MemberEntity from './member_entity';

type AdminMemberEntity = {
  pronoum?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;
} & MemberEntity;

export default AdminMemberEntity;
