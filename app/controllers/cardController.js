// const { List } = require("../models");

function getAllCards(req, res) {
  res.send("Bienvenue dans getAllCards");
}

function getOneCard(req, res) {
  res.send("bienvenue dans getOneCard");
}

function createCard(req, res) {
  console.log("Hello from createCard");
}

function updateCard(req, res) {
  console.log("Hello from updateCard");
}

function deleteCard(req, res) {
  console.log("Hello from deleteCard");
}

function getAllCardsOfList(req, res) {
  res.send("Bienvenue dans toutes les cartes d'une liste");
}

module.exports = {
  getAllCards,
  getAllCardsOfList,
  getOneCard,
  createCard,
  updateCard,
  deleteCard
};