import csv from 'csvtojson';
import { sequelize } from 'database';
import AdminMember from 'database/models/AdminMember';
import Member from 'database/models/Member';
import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MembersRepository from 'domain/repository/members_repository';
import { ValidationError } from 'sequelize';

const ServicesMembersRepository: MembersRepository = {
  readAdminMembersFromCSVFile: async (file: Buffer) => {
    const adminMembersJSON = await csv().fromString(file.toString());

    return adminMembersJSON.map(__mapAdminMemberJSONToEntity);
  },

  saveAdminMember: async (adminMember: AdminMemberEntity) => {
    try {
      return await sequelize.transaction(async (transaction) => {
        const memberModel = await Member.create(
          {
            email: adminMember.email,
            name: adminMember.name,
            CPF: adminMember.CPF,
            RG: adminMember.RG,
            birthday: adminMember.birthday,
            gender: adminMember.gender,
            phone: adminMember.phone,
            socialName: adminMember.socialName,
          },
          { transaction }
        );

        await AdminMember.create(
          {
            memberId: memberModel.idCPE,
            eachCourse: adminMember.eachCourse,
            period: adminMember.period,
            pronoun: adminMember.pronoum,
            semester: adminMember.semester,
          },
          { transaction }
        );

        return adminMember;
      });
    } catch (error) {
      if (error instanceof ValidationError)
        return null;

      throw error;
    }
  },

  getAllAdminMembers: async (): Promise<AdminMemberEntity[]> => {
    const result = await Member.findAll({
      include: [{
        association: Member.associations.adminMember,
        where: { isActive: true },
      }],
    });
    
    return result.map(__mapAdminMemberModelToEntity);
  }
};

const __mapAdminMemberModelToEntity = (member: Member): AdminMemberEntity => {
  return {
    email: member.email,
    name: member.name,
    RG: member.RG,
    CPF: member.CPF,
    gender: member.gender,
    birthday: member.birthday,
    pronoum: member.adminMember?.pronoun,
    phone: member.phone,
    eachCourse: member.adminMember?.eachCourse,
    semester: member.adminMember?.semester,
    period: member.adminMember?.period,
  }
}

const __mapAdminMemberJSONToEntity = (adminMember: any): AdminMemberEntity => {
  return {
    email: adminMember.email,
    name: adminMember.name,
    RG: adminMember.rg,
    CPF: adminMember.cpf,
    gender: adminMember.gender,
    birthday: adminMember.birthday,
    pronoum: adminMember.pronoun,
    phone: adminMember.phone,
    eachCourse: adminMember.each_course,
    semester: parseInt(adminMember.semester),
    period: parseInt(adminMember.period),
  };
};

export default ServicesMembersRepository;
