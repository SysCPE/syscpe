import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Member from './Member';
import {activeEnum} from 'domain/entities/admin_member_entity'

interface AdminMemberAttributes {
  memberId: number;
  member?: Member;

  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  isActive?: activeEnum;
}

interface AdminMemberCreationAttributes
  extends AdminMemberAttributes {}

class AdminMember
  extends Model<AdminMemberAttributes, AdminMemberCreationAttributes>
  implements AdminMemberAttributes
{
  memberId!: number;
  member?: Member;
  
  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  isActive?: activeEnum;

  public static associations: {
    member: Association<AdminMember, Member>;
  };

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
          type: DataTypes.STRING,
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
