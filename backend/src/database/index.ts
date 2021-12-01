import { Sequelize } from 'sequelize';
import AdminMember from './models/AdminMember';
import Department from './models/Department';
import Member from './models/Member';

export const sequelize = new Sequelize(
  (process.env.DB_CONNECTION_STRING as string) || ''
);

const initModels = () => {
  Member.initialize(sequelize);
  AdminMember.initialize(sequelize);
  Department.initialize(sequelize);

  Member.hasOne(AdminMember, { foreignKey: 'memberId', as: 'adminMember' });
  AdminMember.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });
};

export default initModels;
