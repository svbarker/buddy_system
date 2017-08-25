const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    ownerId: DataTypes.INTEGER,
    buddyId: DataTypes.INTEGER,
    pending: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN
  });

  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    List.belongsTo(models.User, { foreignKey: "buddyId", as: "buddy" });
    List.hasMany(models.ListItem, { foreignKey: "listId" });
  };

  return List;
};
