import MemberEntity from './member_entity';
export type activeEnum = 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';

type AdminMemberEntity = {
  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;
  isActive?: activeEnum;
} & MemberEntity;

export default AdminMemberEntity;
