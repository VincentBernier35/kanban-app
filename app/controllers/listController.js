// const { List } = require("../models");

function getAllLists(req, res) {
  res.send("Bienvenue dans getAllLists");
}

function getOneList(req, res) {
  res.send("bienvenue dans getOneList");
}

function createList(req, res) {
  console.log("Hello from createList");
}

function updateList(req, res) {
  console.log("Hello from updateList");
}

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