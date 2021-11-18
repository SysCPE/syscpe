import { Sequelize } from 'sequelize';
import AdminMember from './models/AdminMember';
import IdCPE from './models/IdCPE';
import Member from './models/Member';

export const sequelize = new Sequelize(
  (process.env.DB_CONNECTION_STRING as string) || ''
);

const initModels = () => {
  Member.initialize(sequelize);
  IdCPE.initialize(sequelize);
  AdminMember.initialize(sequelize);

  Member.hasOne(IdCPE, { foreignKey: 'memberId' });
  AdminMember.belongsTo(Member, { foreignKey: 'memberId' });
};

export default initModels;
