const { Router } = require("express");
const tagController = require("../controllers/tagController");
const cw = require("./controllerErrorWrapper");

const router = new Router();

// routes already have "api/tags" prefix
router.get("/", cw(tagController.getAllTags));
router.get("/:id", cw(tagController.getOneTag));
router.post("/", cw(tagController.createTag));
router.patch("/:id", cw(tagController.updateTag));
router.delete("/:id", cw(tagController.deleteTag));

module.exports = router;
