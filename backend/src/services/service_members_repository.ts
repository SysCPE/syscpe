import csv from 'csvtojson';
import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MembersRepository from 'domain/repository/members_repository';

const ServicesMembersRepository: MembersRepository = {
  readAdminMembersFromCSVFile: async (file: Buffer) => {
    const adminMembersJSON = await csv().fromString(file.toString());

    return adminMembersJSON.map(__mapAdminMemberJSONToEntity);
  },
  saveAdminMember: async (adminMember) => {
    return adminMember;
  },
};

const __mapAdminMemberJSONToEntity = (adminMember: any): AdminMemberEntity => {
  return {
    email: adminMember.email,
    name: adminMember.name,
    RG: adminMember.rg,
    CPF: adminMember.cpf,
    gender: adminMember.gender,
    birthday: adminMember.birthday,
    pronoum: adminMember.pronoum,
    phone: adminMember.phone,
    eachCourse: adminMember.each_course,
    semester: parseInt(adminMember.semester),
    period: parseInt(adminMember.period),
  };
};

export default ServicesMembersRepository;
