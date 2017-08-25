"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn("Lists", "pending", Sequelize.BOOLEAN).then(() => {
      return queryInterface.addColumn("Lists", "complete", Sequelize.BOOLEAN);
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn("Lists", "complete").then(() => {
      return queryInterface.removeColumn("Lists", "pending");
    });
  }
};
