import AdminMember from './models/AdminMember';
import Member from './models/Member';
import sequelize from './sequelize';

const initModels = () => {
  Member.initialize(sequelize);
  AdminMember.initialize(sequelize);

  Member.hasOne(AdminMember, { foreignKey: 'memberId', as: 'adminMember' });
};

export default initModels;
