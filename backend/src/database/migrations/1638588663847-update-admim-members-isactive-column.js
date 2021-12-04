const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('AdminMembers', 'isActive')
    .then(
      queryInterface.addColumn('AdminMembers', 'isActive', Sequelize.STRING)
    )
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('AdminMembers', 'isActive')
    .then(
      queryInterface.addColumn('AdminMembers', 'isActive', Sequelize.BOOLEAN)
    )
  },
};
