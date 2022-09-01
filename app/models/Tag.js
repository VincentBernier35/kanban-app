const { DataTypes, Model } = require("sequelize");
const sequelize = require("../databaseConnection");

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.TEXT
  },
  color: {
    type: DataTypes.TEXT // TODO : ajouter une regex de contrôle
  }
}, {
  sequelize, // instance de connexion
  tableName: "tag"
});

module.exports = Tag;