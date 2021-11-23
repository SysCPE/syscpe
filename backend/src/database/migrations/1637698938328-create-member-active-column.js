const { DataTypes } = require('sequelize');

export default {
    up: (queryInterface) => {
        return queryInterface.addColumn('Members', 'isActive', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('Members', 'isActive');
    },
};