const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable('AdminWorkGroups', {
            workGroupId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'WorkGroups',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            adminMemberId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'AdminMembers',
                    key: 'memberId',
                },
                onDelete: 'CASCADE',
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('AdminWorkGroups');
    }
};