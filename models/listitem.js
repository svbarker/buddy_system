const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var ListItem = sequelize.define("ListItem", {
    listId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER
  });

  ListItem.associate = function(models) {
    ListItem.belongsTo(models.List, { foreignKey: "listId" });
  };
  return ListItem;
};
