const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('AdminMembers', 'isActive');
    await queryInterface.addColumn('AdminMembers', 'isActive', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'ACTIVE',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('AdminMembers', 'isActive');
    await queryInterface.addColumn('AdminMembers', 'isActive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },
};
