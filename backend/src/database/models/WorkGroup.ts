import { Association, BelongsToManyGetAssociationsMixin, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import AdminMember from './AdminMember';

interface WorkGroupAttributes {
  id: number;
  name: string;
  description?: string;

  creationDate?: Date;
  endDate?: Date;
}

interface WorkGroupCreationAttributes extends Optional<WorkGroupAttributes, 'id'> {}

class WorkGroup
  extends Model<WorkGroupAttributes, WorkGroupCreationAttributes>
  implements WorkGroupAttributes
{
  id!: number;
  name!: string;
  description?: string;

  members?: AdminMember[];

  creationDate?: Date;
  endDate?: Date;

  public static associations: {
    members: Association<WorkGroup, AdminMember>
  };

  public getMembers!: BelongsToManyGetAssociationsMixin<AdminMember>;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        creationDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        timestamps: false,
      }
    )
  }
}

export default WorkGroup;