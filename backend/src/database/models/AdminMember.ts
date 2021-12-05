import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import Member from './Member';
import { activeEnum } from 'domain/entities/admin_member_entity'
import Department from './Department';

interface AdminMemberAttributes {
  memberId: number;
  member?: Member;
  
  departmentId?: number;
  department?: Department;

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

  departmentId?: number;
  department?: Department;
  
  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  isActive?: activeEnum;

  public static associations: {
    member: Association<AdminMember, Member>;
    department: Association<AdminMember, Department>;
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
          onDelete: 'CASCADE',
        },
        departmentId: {
          type: DataTypes.INTEGER,
          defaultValue: null,
          allowNull: true,
          references: {
            model: Department,
            key: 'id',
          },
          onDelete: 'SET NULL',
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
          defaultValue: "ACTIVE",
          validate: {
            // NOTE: We don't need to add migrations for this, because validators
            // are not run at the database level. https://sequelize.org/master/manual/validations-and-constraints.html
            isIn: [['ACTIVE', 'INACTIVE', 'TIMEOFF']],
          }
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default AdminMember;
