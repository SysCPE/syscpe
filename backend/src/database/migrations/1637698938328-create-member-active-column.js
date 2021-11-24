const { DataTypes } = require('sequelize');

export default {
    up: (queryInterface) => {
        return queryInterface.addColumn('AdminMembers', 'isActive', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('AdminMembers', 'isActive');
    },
};