import { QueryInterface, DataTypes } from "sequelize/types"

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('Users', {
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
        })
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('Users');
    }
}