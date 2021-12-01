const { DataTypes } = require('sequelize');

export default {
  up: (queryInterface) => {
    return queryInterface.createTable('Departments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      directorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          // FIXME: how to properly include Model instead of string?
          model: 'AdminMembers',
          key: 'memberId',
        },
        onDelete: 'SET NULL',
      },
      viceDirectorId: {
        type: DataTypes.INTEGER,
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
