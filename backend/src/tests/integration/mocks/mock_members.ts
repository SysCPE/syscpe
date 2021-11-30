import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MemberEntity from 'domain/entities/member_entity';

export const mockMembers: { [key: string]: MemberEntity } = {
  'a@gmail.com': {
    email: 'a@gmail.com',
    name: 'acbcde',
    RG: '123456',
    CPF: '123456',
    gender: 'M',
    birthday: new Date(1999, 1, 1),
    phone: '11 912341234',
    socialName: '',
  },
  'b@gmail.com': {
    email: 'b@gmail.com',
    name: 'fghij',
    RG: '78901',
    CPF: '78902',
    gender: 'F',
    birthday: new Date(2000, 2, 2),
    phone: '',
    socialName: '',
  },
  'c@gmail.com': {
    email: 'c@gmail.com',
    name: 'name',
    RG: '1',
    CPF: '2',
    gender: 'M',
    phone: '',
    socialName: '',
  },
};

export const mockAdminMembers: { [key: string]: AdminMemberEntity } = {
  'a@gmail.com': {
    pronoun: 'Ele',
    eachCourse: '',
    semester: 2,
    period: 6,
    ...mockMembers['a@gmail.com'],
  },
  'b@gmail.com': {
    pronoun: 'Ela',
    eachCourse: 'Matemática',
    semester: 1,
    period: 4,
    ...mockMembers['b@gmail.com'],
  },
  'c@gmail.com': {
    pronoun: 'Ele',
    eachCourse: '',
    ...mockMembers['c@gmail.com'],
  },
};
