import DepartmentEntity from './department_entity';
import MemberEntity from './member_entity';

type AdminMemberEntity = {
  department?: DepartmentEntity;
  
  pronoun?: string;
  eachCourse?: string;
  semester?: number;
  period?: number;
} & MemberEntity;

export default AdminMemberEntity;
