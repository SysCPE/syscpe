import AdminMember from './models/AdminMember';
import Department from './models/Department';
import Member from './models/Member';
import sequelize from './sequelize';

const initModels = () => {
  Member.initialize(sequelize);
  AdminMember.initialize(sequelize);
  Department.initialize(sequelize);

  Member.hasOne(AdminMember, { foreignKey: 'memberId', as: 'adminMember' });
  AdminMember.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });
};

export default initModels;
