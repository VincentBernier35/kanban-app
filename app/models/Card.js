const { DataTypes, Model } = require("sequelize");
const sequelize = require("../databaseConnection");

class Card extends Model {}

Card.init({
  content: {
    type: DataTypes.TEXT
  },
  position: {
    type: DataTypes.INTEGER // Note: on autorise 2 cards à avoir la même position par simplicité
  },
  color: {
    type: DataTypes.TEXT // TODO ajouter une regex
  }
}, {
  sequelize, // connection instance
  tableName: "card"
});

module.exports = Card;
