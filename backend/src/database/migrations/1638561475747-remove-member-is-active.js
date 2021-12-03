const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {      
    return queryInterface.removeColumn('Members', 'isActive');
  },
  down: (queryInterface) => {
    return queryInterface.addColumn('Members', 'isActive');
  },
};
