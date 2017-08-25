const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    ownerId: DataTypes.INTEGER,
    buddyId: DataTypes.INTEGER
  });

  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: "ownerId" });
  };

  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: "buddyId" });
  };

  List.associate = function(models) {
    List.hasMany(models.ListItem, { foreignKey: "listId" });
  };

  return List;
};
