import { Sequelize } from 'sequelize';
import AdminMember from './models/AdminMember';
import Member from './models/Member';

export const sequelize = new Sequelize(
  (process.env.DB_CONNECTION_STRING as string) || ''
);

const initModels = () => {
  Member.initialize(sequelize);
  AdminMember.initialize(sequelize);

  Member.hasOne(AdminMember, { foreignKey: 'memberId', as: 'adminMember' });
};

export default initModels;
