const sanitizeHtml = require("sanitize-html");
const { List, Card } = require("../models");

//**************************************** */
async function getAllLists(req, res) {
  const lists = await List.findAll({
    order: [
      ["position", "ASC"],
      ["created_at", "DESC"],
      [ { model: Card, as: "cards" }, "position", "ASC"]
    ],
    include: {
      association: "cards",
      include: "tags",
    }
  });
  res.json(lists);
}

//**************************************** */
async function getOneList(req, res) {
  const listId = parseInt(req.params.id);

  if ( isNaN(listId) ) {
    res.status(404).json({ error: "List not found please verify the provided id"});
    return;
  }
  const list = await List.findByPk(listId);
  if (! list) {
    res.status(404).json({ error: "List not found. Please verify the provided id."});
    return;
  }
  res.json(list);
}
//**************************************** */
async function createList(req, res) {
  const { name, position } = req.body;

  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid type. position should return a number"});
  }
  if (! name) {
    return res.status(400).json({ error: "Missing body parameter: name"});
  }

  const list = await List.create({
    name: sanitizeHtml(name),
    position
  });

  res.status(201).json(list);
}

//**************************************** */
async function updateList(req, res) {

  const listId = parseInt(req.params.id);
  const { name, position } = req.body;

  if (! name && ! position) {
    return res.status(400).json({ error: "Please verify the parameters send through the body"});
  }
  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid body parameter 'position'. Should provide a number." });
  }

  const list = await List.findByPk(listId);
  if (! list) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." });
  }
  console.log(name);


  if (name) {
    list.name = sanitizeHtml(name);
  }
  if (position) {
    list.position = parseInt(position);
  }
  await list.save();

  // return response
  res.json(list);
}


//**************************************** */
async function deleteList(req, res) {

  const id = parseInt(req.params.id);

  const list = await List.findByPk(id);
  if(! list) {
    return res.status(404).json({ error: "List not found. please verify the provided id"});
  }

  await list.destroy();

  res.status(204).end();
}

//**************************************** */

module.exports = {
  getAllLists,
  getOneList,
  createList,
  updateList,
  deleteList
};