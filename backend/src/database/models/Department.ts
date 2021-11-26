import AdminMemberEntity from 'domain/entities/admin_member_entity';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import AdminMember from './AdminMember';

interface DepartmentAttributes {
    id: number;
    name: string;
    creationDate: Date;

    directorId?: number;
    viceDirectorId?: number;

    director?: AdminMemberEntity;
    viceDirector?: AdminMemberEntity;
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
  
  director?: AdminMemberEntity | undefined;
  viceDirector?: AdminMemberEntity | undefined;

  directorId?: number;
  viceDirectorId?: number;

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
            model: AdminMember,
          }
        },
        viceDirectorId: {
          type: DataTypes.NUMBER,
          allowNull: true,
          references: {
            model: AdminMember,
          }
        }
      },
      {
        sequelize,
      }
    );
  }
}

export default Department;
