const { DataTypes } = require('sequelize');

export default {
  up: (queryInterface) => {
    return queryInterface.createTable('IdCPEs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idCPE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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
    return queryInterface.dropTable('IdCPEs');
  },
};
