const { DataTypes } = require('sequelize');

export default {
  up: (queryInterface) => {
    return queryInterface.createTable('AdminMembers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pronoum: {
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
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'Members',
          key: 'id',
        },
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
