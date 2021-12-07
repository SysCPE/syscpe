import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

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

  creationDate?: Date;
  endDate?: Date;
  

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
          allowNull: false,
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
      }
    )
  }
}

export default WorkGroup;