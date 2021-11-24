import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface AdminMemberAttributes {
  id: number;

  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  memberId: number;
  isActive?: boolean;
}

interface AdminMemberCreationAttributes
  extends Optional<AdminMemberAttributes, 'id'> {}

class AdminMember
  extends Model<AdminMemberAttributes, AdminMemberCreationAttributes>
  implements AdminMemberAttributes
{
  id!: number;

  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  memberId!: number;

  isActive?: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        memberId: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
