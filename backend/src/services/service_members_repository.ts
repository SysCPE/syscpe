import csv from 'csvtojson';
import AdminMember from 'database/models/AdminMember';
import Department from 'database/models/Department';
import Member from 'database/models/Member';
import WorkGroup from 'database/models/WorkGroup';
import sequelize from 'database/sequelize';
import AdminMemberEntity, {
  activeEnum,
} from 'domain/entities/admin_member_entity';
import DepartmentEntity from 'domain/entities/department_entity';
import WorkGroupEntity from 'domain/entities/work_group_entity';
import AdminMembersRepository from 'domain/repository/admin_members_repository';
import { ValidationError } from 'sequelize';

const ServicesMembersRepository: AdminMembersRepository = {
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
            isActive: adminMember.isActive,
          },
          { transaction }
        );

        return {
          ...adminMember,
          idCPE: memberModel.idCPE,
        };
      });
    } catch (error) {
      if (error instanceof ValidationError) return null;

      throw error;
    }
  },

  getAllAdminMembers: async (): Promise<AdminMemberEntity[]> => {
    const result = await AdminMember.findAll({
      include: [
        { association: AdminMember.associations.member, required: true },
        { association: AdminMember.associations.department },
      ],
    });

    return result.map(__mapAdminMemberModelToEntity);
  },

  getAdminMember: async function (
    memberId: number
  ): Promise<AdminMemberEntity | null> {
    const result = await __getAdminMemberModel(memberId);
    if (!result) return null;
    return __mapAdminMemberModelToEntity(result);
  },

  getAdminMemberByEmail: async function (
    email: string
  ): Promise<AdminMemberEntity | null> {
    const result = await __getAdminMemberModelByEmail(email);
    if (!result) return null;
    return __mapAdminMemberModelToEntity(result);
  },

  changeAdminMemberDepartment: async function (
    member: AdminMemberEntity,
    department: DepartmentEntity
  ): Promise<AdminMemberEntity> {
    const memberModel = await __getAdminMemberModel(member.idCPE!);
    if (!memberModel) return member;

    // TODO: break this coupling (maybe add "private" methods to DepartmentService that return Models?)
    const departmentModel = await Department.findOne({
      where: { name: department.name },
    });
    await memberModel.setDepartment(departmentModel!);

    memberModel.department = await memberModel.getDepartment();
    return __mapAdminMemberModelToEntity(memberModel);
  },

  assignToWorkGroup: async function (
    member: AdminMemberEntity,
    workgroup: WorkGroupEntity
  ): Promise<AdminMemberEntity> {
    const memberModel = await __getAdminMemberModel(member.idCPE!);
    if (!memberModel) return member;

    // TODO: break this coupling (maybe add "private" methods to WorkGroupService that return Models?)
    const workGroupModel = await WorkGroup.findOne({
      where: { name: workgroup.name },
    });
    if (!workGroupModel) return member;

    await memberModel.addWorkgroup(workGroupModel);

    memberModel.workgroups = await memberModel.getWorkgroups();

    return __mapAdminMemberModelToEntity(memberModel);
  },

  deleteMember: async (idCPE: number) => {
    await AdminMember.destroy({
      where: {
        memberId: idCPE,
      },
    });
  },
};

const __getAdminMemberModel = async (memberId: number) => {
  const result = await AdminMember.findByPk(memberId, {
    include: [
      {
        association: AdminMember.associations.member,
        required: true,
      },
      { association: AdminMember.associations.department },
      { association: AdminMember.associations.workgroups },
    ],
  });

  if (!result) return null;

  return result;
};

const __getAdminMemberModelByEmail = async (email: string) => {
  const result = await AdminMember.findOne({
    include: [
      {
        association: AdminMember.associations.member,
        where: { email: email },
      },
      { association: AdminMember.associations.department },
      { association: AdminMember.associations.workgroups },
    ],
  });

  if (!result) return null;

  return result;
};

const __mapAdminMemberModelToEntity = (
  adminMember: AdminMember
): AdminMemberEntity => {
  return {
    idCPE: adminMember.member!.idCPE,
    email: adminMember.member!.email,
    name: adminMember.member!.name,

    departmentName: adminMember.department?.name,
    workgroups: adminMember.workgroups?.map((workgp) => workgp.name) || [],

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
    isActive: adminMember.isActive,
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
    isActive: adminMember.isActive || ('ACTIVE' as activeEnum),
  };
};

export default ServicesMembersRepository;
