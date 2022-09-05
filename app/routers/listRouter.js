const { Router } = require("express");
const listController = require("../controllers/listController");
const cw = require("./controllerErrorWrapper");

const router = new Router();

// routes already have "api/lists" prefix
router.get("/", cw(listController.getAllLists));
router.get("/:id", cw(listController.getOneList));
router.get("/:id/cards", cw(listController.getAllCardsByList));
router.post("/", cw(listController.createList));
router.patch("/:id", cw(listController.updateList));
router.delete("/:id", cw(listController.deleteList));

module.exports = router;