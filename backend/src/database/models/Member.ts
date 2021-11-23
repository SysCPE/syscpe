import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface MemberAttributes {
  id: number;
  email: string;
  name: string;

  RG?: string;
  CPF?: string;

  socialName?: string;
  gender?: string;
  birthday?: Date;
  phone?: string;

  isActive?: boolean;
}

interface MemberCreationAttributes extends Optional<MemberAttributes, 'id'> {}

class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  id!: number;
  email!: string;
  name!: string;

  RG?: string;
  CPF?: string;

  socialName?: string;
  gender?: string;
  birthday?: Date;
  phone?: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        RG: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        CPF: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        socialName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthday: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        }
      },
      {
        sequelize,
      }
    );
  }
}

export default Member;
