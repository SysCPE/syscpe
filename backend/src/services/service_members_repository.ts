import csv from 'csvtojson';
import AdminMember from 'database/models/AdminMember';
import IdCPE from 'database/models/IdCPE';
import Member from 'database/models/Member';
import sequelize from 'database/sequelize';
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
            memberId: memberModel.id,
            eachCourse: adminMember.eachCourse,
            period: adminMember.period,
            pronoum: adminMember.pronoum,
            semester: adminMember.semester,
          },
          { transaction }
        );

        await IdCPE.create(
          { memberId: memberModel.id, idCPE: memberModel.id },
          { transaction }
        );

        return adminMember;
      });
    } catch (error) {
      if (error instanceof ValidationError) return null;

      throw error;
    }
  },
};

const __mapAdminMemberJSONToEntity = (adminMember: any): AdminMemberEntity => {
  const _parseDate = (date: string) => {
    if (!date) return undefined;

    const [day, month, year] = date.split('/');

    return new Date(parseInt(year), parseInt(month), parseInt(day));
  };

  return {
    email: adminMember.email,
    name: adminMember.name,
    RG: adminMember.rg || '',
    CPF: adminMember.cpf || '',
    gender: adminMember.gender || '',
    birthday: _parseDate(adminMember.birthday),
    pronoum: adminMember.pronoum || '',
    phone: adminMember.phone || '',
    socialName: adminMember.socialName || '',
    eachCourse: adminMember.each_course || '',
    semester: parseInt(adminMember.semester) || undefined,
    period: parseInt(adminMember.period) || undefined,
  };
};

export default ServicesMembersRepository;
