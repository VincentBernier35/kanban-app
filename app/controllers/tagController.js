

function getAllTags(req, res) {
  res.send("Bienvenue dans getAllTags");
}

function getOneTag(req, res) {
  res.send("bienvenue dans getOneTag");
}

function createTag(req, res) {
  console.log("Hello from createTag");
}

function updateTag(req, res) {
  console.log("Hello from updateTag");
}

function deleteTag(req, res) {
  console.log("Hello from deleteTag");
}

function addTagToCard(req, res) {
  res.send("Hello from addTagToCard");
}

function removeTagFromCard(req, res) {
  res.send("hello from removeTagFromCard");
}


module.exports = {
  getAllTags,
  getOneTag,
  createTag,
  updateTag,
  deleteTag,
  addTagToCard,
  removeTagFromCard
};
