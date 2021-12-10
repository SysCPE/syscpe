import { Association, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes, HasManyAddAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, Sequelize } from 'sequelize';
import Member from './Member';
import { activeEnum } from 'domain/entities/admin_member_entity'
import Department from './Department';
import WorkGroup from './WorkGroup';

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

  workgroups?: WorkGroup[];
  
  pronoun?: string;

  eachCourse?: string;
  semester?: number;
  period?: number;

  isActive?: activeEnum;

  public static associations: {
    member: Association<AdminMember, Member>;
    department: Association<AdminMember, Department>;
    workgroups: Association<AdminMember, WorkGroup>;
  };

  public setDepartment!: HasOneSetAssociationMixin<Department, number>;
  public getDepartment!: HasOneGetAssociationMixin<Department>;

  // WARNING: These method names cannot change since Sequelize expects them as such (no capital G :c)
  public addWorkgroup!: BelongsToManyAddAssociationMixin<WorkGroup, number>;
  public getWorkgroups!: BelongsToManyGetAssociationsMixin<WorkGroup>;

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
