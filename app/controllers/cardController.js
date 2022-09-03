const { Card, List, Tag } = require("../models");
const { isValidHexadecimalColor } = require("./utils");

//**************************************** */
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
  res.json(cards);
}

//**************************************** */
async function getOneCard(req, res) {
  const cardId = req.params.id;
  const card = await Card.findByPk(cardId, {
    include: { association: "tags" }
  });
  if (! card) {
    return res.status(404).json({ error: "Card not found. Please verify the provided id." });
  }
  res.json(card);
}

//**************************************** */
async function createCard(req, res) {
  const { content, color, position, list_id } = req.body;

  if (! content) {
    return res.status(400).json({ error: "Missing body (or empty) parameter: 'content'." });
  }
  if (! list_id) {
    return res.status(400).json({ error: "Missing body parameter: 'list_id'."});
  }
  if (color && ! isValidHexadecimalColor(color)) { // On veut vérifier que la couleur est un hexadecimal valide
    return res.status(400).json({ error: "Invalid type: 'color' should be a valid hexadecimal code." });
  }
  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid type: 'position' should be a number." });
  }
  if (! await doesListExist(list_id)) {
    return res.status(400).json({ error: "Invalid body parameter: 'list_id' does not exist." });
  }

  const card = Card.build({
    content,
    list_id,
    position: position || 0,
    color: color || undefined // ou '...(color ? { color } : {})'
  });
  await card.save();

  res.status(201).json(card);
}

//**************************************** */
async function updateCard(req, res) {
  const cardId = req.params.id;
  const { content, position, color, list_id } = req.body;

  if (! content && ! position && ! color && ! list_id) {
    return res.status(400).json({ error: "Invalid body. Should provide at least a 'content', 'color', 'position'  or 'list_id' property" });
  }
  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid type: 'position' should be a number." });
  }
  if (color && ! isValidHexadecimalColor(color)) {
    return res.status(400).json({ error: "Invalid type: position should be a valid hexadecimal code (string)." });
  }
  if (list_id && !await doesListExist(list_id)) {
    return res.status(400).json({ error: "Invalid body parameter: list_id does not exist." });
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

//**************************************** */
async function doesListExist(listId) {
  const list = await List.findByPk(listId);
  return !! list;
}

//**************************************** */
async function deleteCard(req, res) {
  const cardId = req.params.id;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.status(404).send({ error: "Card not found. Please verify the provided id." });
  }

  await card.destroy();

  res.status(204).end();
}

//**************************************** */
async function addTagToCard(req, res) {
  const { cardId, tagId } = req.params;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.json({ error: "Card not found. Please verify the provided id." });
  }

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.json({ error: "Tag not found. Please verify the provided id." });
  }

  await card.addTag(tag);

  const updatedCard = await Card.findByPk(cardId, { include: ["tags"] });
  res.status(201).json(updatedCard);
}

//**************************************** */
async function removeTagFromCard(req, res) {
  const { cardId, tagId } = req.params;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.json({ error: "Card not found. Please verify the provided id." });
  }

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.json({ error: "Tag not found. Please verify the provided id." });
  }

  await card.removeTag(tag);

  const updatedCard = await Card.findByPk(cardId, { include: ["tags"] });
  res.json(updatedCard);
}

module.exports = {
  getAllCards,
  getOneCard,
  createCard,
  updateCard,
  deleteCard,
  addTagToCard,
  removeTagFromCard
};
