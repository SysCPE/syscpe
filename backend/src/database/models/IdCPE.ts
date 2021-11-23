import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IdCPEAttributes {
  id: number;

  idCPE: number;
  memberId: number;
}

interface IdCPECreationAttributes extends Optional<IdCPEAttributes, 'id'> {}

class IdCPE
  extends Model<IdCPEAttributes, IdCPECreationAttributes>
  implements IdCPEAttributes
{
  id!: number;

  idCPE!: number;
  memberId!: number;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        idCPE: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
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

export default IdCPE;
