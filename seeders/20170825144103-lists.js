"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    var lists = [];
    for (let i = 0; i < 20; i++) {
      lists.push({
        ownerId: i % 10 + 1,
        buddyId: (i + 1) % 10 + 1,
        pending: false,
        complete: false
      });
    }
    return queryInterface.bulkInsert("Lists", lists);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Lists", null, {});
  }
};
