import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface UserAttributes {
    id: number
    username: string
    passwordHash: string
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public passwordHash!: string;
}

export default (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: new DataTypes.STRING(32),
            allowNull: false
        },
        passwordHash: {
            type: new DataTypes.STRING(32),
            allowNull: false
        }
    },
    {
        sequelize: sequelize, 
    });
};