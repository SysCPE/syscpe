const { DataTypes } = require('sequelize');

export default {
    up: (queryInterface) => {
        return queryInterface.addConstraint('Departments', {
            type: 'UNIQUE',
            fields: ['name'],
            name: 'department_unique_name',
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeConstraint('Departments', 'department_unique_name');
    },
};