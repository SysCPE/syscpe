const { Sequelize } = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('Departments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      directorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          // FIXME: how to properly include Model instead of string?
          model: 'AdminMembers',
          key: 'memberId',
        },
        onDelete: 'SET NULL',
      },
      viceDirectorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          // FIXME: how to properly include Model instead of string?
          model: 'AdminMembers',
          key: 'memberId',
        },
        onDelete: 'SET NULL',
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Departments');
  },
};
