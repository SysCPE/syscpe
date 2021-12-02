import csv from 'csvtojson';
import AdminMember from 'database/models/AdminMember';
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
            memberId: memberModel.idCPE,
            eachCourse: adminMember.eachCourse,
            period: adminMember.period,
            pronoun: adminMember.pronoun,
            semester: adminMember.semester,
            isActive: adminMember.isActive!,
          },
          { transaction }
        );

        return adminMember;
      });
    } catch (error) {
      if (error instanceof ValidationError) return null;

      throw error;
    }
  },

  getAllAdminMembers: async (): Promise<AdminMemberEntity[]> => {
    const result = await AdminMember.findAll({
      include: [
        {
          association: AdminMember.associations.member,
        },
      ],
      where: {
        isActive: true,
      },
    });

    return result.map(__mapAdminMemberModelToEntity);
  },
};

const __mapAdminMemberModelToEntity = (
  adminMember: AdminMember
): AdminMemberEntity => {
  return {
    email: adminMember.member!.email,
    name: adminMember.member!.name,
    RG: adminMember.member!.RG,
    CPF: adminMember.member!.CPF,
    gender: adminMember.member!.gender,
    birthday: adminMember.member!.birthday,
    socialName: adminMember.member!.socialName,
    pronoun: adminMember.pronoun,
    phone: adminMember.member!.phone,
    eachCourse: adminMember.eachCourse,
    semester: adminMember.semester,
    period: adminMember.period,
  };
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
    pronoun: adminMember.pronoun || '',
    phone: adminMember.phone || '',
    socialName: adminMember.socialName || '',
    eachCourse: adminMember.each_course || '',
    semester: parseInt(adminMember.semester) || undefined,
    period: parseInt(adminMember.period) || undefined,
    isActive: adminMember.isActive || true,
  };
};

export default ServicesMembersRepository;
