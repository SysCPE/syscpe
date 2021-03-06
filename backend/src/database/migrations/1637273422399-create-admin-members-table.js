const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('AdminMembers', {
      memberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Members',
          key: 'idCPE',
        },
        onDelete: 'CASCADE',
      },
      pronoun: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eachCourse: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      semester: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    return queryInterface.dropTable('AdminMembers');
  },
};
