import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface AdminMemberAttributes {
  id: number;

  pronoum?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  memberId: number;
}

interface AdminMemberCreationAttributes
  extends Optional<AdminMemberAttributes, 'id'> {}

class AdminMember
  extends Model<AdminMemberAttributes, AdminMemberCreationAttributes>
  implements AdminMemberAttributes
{
  id!: number;

  pronoum?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  memberId!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        pronoum: {
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
      },
      {
        sequelize,
      }
    );
  }
}

export default AdminMember;