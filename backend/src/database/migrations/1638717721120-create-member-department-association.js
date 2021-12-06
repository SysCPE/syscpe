const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn('AdminMembers', 'departmentId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Departments',
                key: 'id',
            },
            onDelete: 'SET NULL',
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('AdminMembers', 'departmentId');
    },
};