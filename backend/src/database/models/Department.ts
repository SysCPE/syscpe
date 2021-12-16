import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import AdminMember from './AdminMember';

interface DepartmentAttributes {
    id: number;
    name: string;
    creationDate: Date;

    directorId?: number;
    viceDirectorId?: number;

    members?: AdminMember[];

    director?: AdminMember;
    viceDirector?: AdminMember;
}

interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, 'id'> {}

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  id!: number;
  name!: string;
  creationDate!: Date;

  members?: AdminMember[];

  director?: AdminMember;
  directorId?: number;

  viceDirector?: AdminMember;
  viceDirectorId?: number;

  public static associations: {
    members: Association<Department, AdminMember>;
    director: Association<Department, AdminMember>;
    viceDirector: Association<Department, AdminMember>;
  };

  public static initialize(sequelize: Sequelize) {
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
        creationDate: {
          type: DataTypes.DATEONLY,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        directorId: {
          type: DataTypes.NUMBER,
          allowNull: true,
          references: {
            // If we use AdminMember model directly, a cyclic reference will occur
            model: 'AdminMembers',
            key: 'memberId',
          },
          onDelete: 'SET NULL',
        },
        viceDirectorId: {
          type: DataTypes.NUMBER,
          allowNull: true,
          references: {
            // If we use AdminMember model directly, a cyclic reference will occur
            model: 'AdminMembers',
            key: 'memberId',
          },
          onDelete: 'SET NULL',
        }
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}

export default Department;
