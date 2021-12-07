const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('WorkGroups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    creationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
    },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('WorkGroups');
  },
};