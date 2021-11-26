const { DataTypes } = require('sequelize');

export default {
  up: (queryInterface) => {
    return queryInterface.createTable('AdminMembers', {
      memberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Members',
          key: 'idCPE',
        },
        onDelete: 'CASCADE',
      },
      pronoun: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eachCourse: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('AdminMembers');
  },
};
