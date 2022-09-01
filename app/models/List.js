const { DataTypes, Model } = require("sequelize");
const sequelize = require("../databaseConnection");

class List extends Model {}

List.init({
  name: {
    type: DataTypes.TEXT
  },
  position: {
    type: DataTypes.INTEGER  // note: pour simplifier 2 listes peuvent avoir la même position
  }
}, {
  sequelize, // c'est l'instance de connexion
  tableName: "list"
});

module.exports = List;