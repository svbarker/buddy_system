"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: function(queryInterface, Sequelize) {
    var users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: `foobar${i}`,
        password: bcrypt.hashSync("password", 12),
        currency: 50
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
