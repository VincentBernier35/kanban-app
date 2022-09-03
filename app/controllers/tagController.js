const { Tag, Card } = require("../models");
const { isValidHexadecimalColor } = require("./utils");

//************************************** */
async function getAllTags(req, res) {
  // fetch from database
  const tags = await Tag.findAll();
  res.json(tags);
}

//************************************** */
async function getOneTag(req, res) {
  // collect the params id
  const tagId = req.params.id;
  // fetch from database
  const tag = await Tag.findByPk(tagId);

  if (! tag) {
    return res.status(400).json({ error: "Tag not found. Please verify the provided id." });
  }

  res.json(tag);
}

//************************************** */
async function createTag(req, res) {
  const { name, color } = req.body;

  if (! name) {
    return res.json({ error: "Missing (or empty) body parameter: 'name'."});
  }
  if (color && ! isValidHexadecimalColor(color)) {
    return res.status(400).json({ error : "Invalid type: 'color' should be a hexadecimal code."});
  }
  const tag = await Tag.create({ name, color });
  res.status(201).json(tag);
}

//************************************** */
async function updateTag(req, res) {
  const tagId = req.params.id;
  const { name, color } = req.body;

  if (! name && ! color) {
    return res.status(400).json({ error: "Invalid body. Should provide at least a 'name' or 'color' property."});
  }
  if (color && ! isValidHexadecimalColor(color)) {
    return res.status(400).json({ error: "Invalid type: color should be a hexadecimal color (string)"});
  }

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.status(400).json({ error: "Tag not found..."});
  }

  tag.name = name || tag.name;
  tag.color = color || tag.color;
  await tag.save();

  res.send(tag);
}

//************************************** */
async function deleteTag(req, res) {
  const tagId = req.params.id;

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.status(400).json( {error: "Tag not found..."});
  }

  await tag.destroy();

  res.status(204).end;
}

//************************************** */
async function addTagToCard(req, res) {
  const { cardId, tagId } = req.params;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.json({ error: "Card not found..."});
  }

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.json({ error: "Tag not found..."});
  }

  await card.addTag(tag);

  const updatedCard = await Card.findByPk(cardId, { include: ["tags"]});
  res.status(201).json(updatedCard);
}

//************************************** */
async function removeTagFromCard(req, res) {
  const { cardId, tagId } = req.params;

  const card = await Card.findByPk(cardId);
  if (! card) {
    return res.status(401).json({ error: "Card not found..."});
  }

  const tag = await Tag.findByPk(tagId);
  if (! tag) {
    return res.status(401).json({error: "Tag not found..."});
  }

  await card.removeTag(tag);

  const updatedcard = await Card.findByPk(cardId, { include: ["tags"]});
  res.json(updatedcard);
}

//************************************** */
module.exports = {
  getAllTags,
  getOneTag,
  createTag,
  updateTag,
  deleteTag,
  addTagToCard,
  removeTagFromCard
};
