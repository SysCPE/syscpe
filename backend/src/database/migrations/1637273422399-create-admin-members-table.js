const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('AdminMembers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pronoum: {
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
    return queryInterface.dropTable('AdminMembers');
  },
};
