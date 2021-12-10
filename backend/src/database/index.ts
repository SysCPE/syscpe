import AdminMember from './models/AdminMember';
import AdminWorkGroup from './models/AdminWorkGroup';
import Department from './models/Department';
import Member from './models/Member';
import WorkGroup from './models/WorkGroup';
import sequelize from './sequelize';

const initModels = () => {
  Member.initialize(sequelize);
  Department.initialize(sequelize);
  AdminMember.initialize(sequelize);
  WorkGroup.initialize(sequelize);
  AdminWorkGroup.initialize(sequelize);

  Member.hasOne(AdminMember, { foreignKey: 'memberId', as: 'adminMember' });
  AdminMember.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });

  AdminMember.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
  Department.hasMany(AdminMember, { foreignKey: 'departmentId', as: 'members' });

  AdminMember.belongsToMany(WorkGroup, { through: AdminWorkGroup, foreignKey: 'adminMemberId', as: 'workgroups' });
  WorkGroup.belongsToMany(AdminMember, { through: AdminWorkGroup, foreignKey: 'workGroupId', as: 'members' });
};

export default initModels;
