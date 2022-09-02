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
  if (! list_id) {
    return res.status(400).json({error: "Missing body parameter: 'list_id"});
  }
  if (position && isNaN(position)) {
    return res.status(400).json({error: "Invalid type : position should be a number. "});
  }

  //*********** */
  const card = Card.findByPk(cardId);
  if (! card) {
    return res.json({" error: Card not found please verify the provided id. "});
  }
  if (content !== undefined) {
    card.content = content;
  }
  if (position !== undefined) {
    card.position = position;
  }
  if (color !== undefined) {
    card.color = color;
  }
  if (list_id) {
    card.list_id = list_id;
  }
  await card.save();

  res.send(card);
}

function updateCard(req, res) {
  const cardId = req.params.id;
  const { content, position, color, list_id } = req.body;

  if (! content && ! position && ! color && ! list_id) {
    return res.status(400).json({ error: "Invalid body. Should provide at least a 'content', 'color', 'position'  or 'list_id' property" });
  }

  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid type: 'position' should be a number." });
  }





  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.json({ error: "Card not found. Please verify the provided id." });
  }

  if (content !== undefined) {
    card.content = content;
  }

  if (position !== undefined) {
    card.position = position;
  }

  if (color !== undefined) {
    card.color = color;
  }

  if (list_id) {
    card.list_id = list_id;
  }

  await card.save();

  res.send(card);

}

async function deleteCard(req, res) {
  const cardId = req.params.id;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.status(404).send({ error: "Card not found. Please verify the provided id." });
  }

  await card.destroy();

  res.status(204).end();
}



module.exports = {
  getAllCards,

  getOneCard,
  createCard,
  updateCard,
  deleteCard
};