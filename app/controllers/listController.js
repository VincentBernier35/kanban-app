const sanitizeHtml = require("sanitize-html");
const { List, Card } = require("../models");

//**************************************** */
async function getAllLists(req, res) {
  const lists = await List.findAll({
    order: [
      ["position", "ASC"],
      ["created_at", "DESC"],
      [ { model: Card, as: "cards" }, "position", "ASC"]
    ], // attention cette technique alourdi la taille de la réponse, donc du transfert, donc la vitesse de réponses de notre API
    include: {
      association: "cards",
      include: "tags",
    } // attention cette technique alourdi la taille de la réponse, donc du transfert, donc la vitesse de réponses de notre API
  });
  res.json(lists); // je renvoie du json au client. Le statut est 200 par défaut. on peut le préciser ou non
}

//**************************************** */
async function getOneList(req, res) {
  const listId = parseInt(req.params.id);

  if ( isNaN(listId) ) { // je vérifie le user input avant car si ce n'est pas bon cela épargne un appel à l'API
    res.status(404).json({ error: "List not found please verify the provided id"});
    return;
  }
  const list = await List.findByPk(listId); 
  if (! list) { // si elle n'existe pas alors 404
    res.status(404).json({ error: "List not found. Please verify the provided id."});
    return; // je stoppe la fonction
  }
  res.json(list);
}
//**************************************** */
async function createList(req, res) {
  const { name, position } = req.body;

  if (position && isNaN(position)) { // je protège l'API avec des early return
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
async function 


//**************************************** */
function deleteList(req, res) {
  console.log("Hello from deleteList");
}

module.exports = {
  getAllLists,
  getOneList,
  createList,
  updateList,
  deleteList
};