// connexion à la BDD avec l'ORM sequelize

require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = sequelize;