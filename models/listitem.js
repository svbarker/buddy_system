const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var ListItem = sequelize.define("ListItem", {
    listId: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "You must provide a description for the task"
        }
      }
    },
    checked: DataTypes.BOOLEAN,
    value: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "You must provide a point value for the task"
        }
      }
    }
  });

  ListItem.associate = function(models) {
    ListItem.belongsTo(models.List, { foreignKey: "listId" });
  };

  return ListItem;
};
