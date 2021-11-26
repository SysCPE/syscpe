const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('IdCPEs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idCPE: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Members',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('IdCPEs');
  },
};
