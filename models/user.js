const bcrypt = require("bcrypt");
const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username field is required"
        },
        isAlphanumeric: {
          msg: "Username may only contain letters and numbers"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password field is required"
        }
      }
    },
    currency: DataTypes.INTEGER
  });

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, 12);
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Category.associate = function(models) {
  //   Category.hasMany(models.Product, { foreignKey: "categoryId" });
  // };

  User.associate = function(models) {
    User.hasMany(models.List, { foreignKey: "ownerId", as: "ownedLists" });
    User.hasMany(models.List, { foreignKey: "buddyId", as: "buddyLists" });
  };

  return User;
};
