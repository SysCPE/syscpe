const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('AdminMembers', 'isActive')
    .then( queryInterface.addColumn('AdminMembers', 'isActive', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "ACTIVE",
    }))
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('AdminMembers', 'isActive')
    .then(
      queryInterface.addColumn('AdminMembers', 'isActive', { 
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      })
    )
  },
};
