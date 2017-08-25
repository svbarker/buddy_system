const bcrypt = require("bcrypt");
const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    currency: DataTypes.INTEGER
  });

  User.beforeCreate = function(user) {
    user.password = bcrypt.hashSync(user.password, 12);
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Category.associate = function(models) {
  //   Category.hasMany(models.Product, { foreignKey: "categoryId" });
  // };

  User.associate = function(models) {
    User.hasMany(models.List, { foreignKey: "ownerId" });
  };

  User.associate = function(models) {
    User.hasMany(models.List, { foreignKey: "buddyId" });
  };

  return User;
};
