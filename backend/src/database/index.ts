import AdminMember from './models/AdminMember';
import IdCPE from './models/IdCPE';
import Member from './models/Member';
import sequelize from './sequelize';

const initModels = () => {
  Member.initialize(sequelize);
  IdCPE.initialize(sequelize);
  AdminMember.initialize(sequelize);

  Member.hasOne(IdCPE, { foreignKey: 'memberId' });
  Member.hasOne(AdminMember, { foreignKey: 'memberId' });
};

export default initModels;
