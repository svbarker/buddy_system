"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    var listItems = [];
    for (let i = 0; i < 100; i++) {
      listItems.push({
        listId: i % 20 + 1,
        description: `Do the thing ${i}`,
        checked: false,
        value: Math.floor(Math.random() * 10) + 1
      });
    }
    return queryInterface.bulkInsert("ListItems", listItems);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ListItems", null, {});
  }
};
