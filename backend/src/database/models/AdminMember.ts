import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Member from './Member';

interface AdminMemberAttributes {
  memberId: number;

  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  isActive?: boolean;
}

interface AdminMemberCreationAttributes
  extends AdminMemberAttributes {}

class AdminMember
  extends Model<AdminMemberAttributes, AdminMemberCreationAttributes>
  implements AdminMemberAttributes
{
  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  memberId!: number;

  isActive?: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        memberId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Member,
            key: 'idCPE',
          },
          onDelete: 'CASCADE'
        },
        pronoun: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        eachCourse: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        semester: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        period: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default AdminMember;
