import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import AdminMember from './AdminMember';

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

  adminMember?: AdminMember;

  public static associations: {
    adminMember: Association<Member, AdminMember>;
  };

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
          type: DataTypes.DATE,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Member;
