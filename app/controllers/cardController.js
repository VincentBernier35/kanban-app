const { Card, List } = require("../models");

async function getAllCards(req, res) {
  const cards = await Card.findAll({
    order: [
      ["position", "ASC"],
      ["created_at", "DESC"]
    ],
    include: {
      association: "tags"
    }
  });
  console.log("cards");
  res.json(cards);
}

async function getOneCard(req, res) {
  const cardId = req.params.id;
  const oneCard = await Card.findByPk(cardId, {
    include: { association: "tags" }
  });
  if (! oneCard) {
    return res.status(404).json({ error: "Card not found. Please verify the provided id."});
  }
  res.json(oneCard);
}

async function createCard(req, res) {
  const { content, color, position, list_id } = req.body;

  if (! content) {
    return res.status(400).json({ error: "Missing body (or empty) parameter: 'content'."});
  }
  
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