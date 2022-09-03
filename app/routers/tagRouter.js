const { Router } = require("express");
const tagController = require("../controllers/tagController");

const router = new Router();

// routes already have "api/tags" prefix
router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getOneTag);
router.post("/", tagController.createTag);
router.patch("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

module.exports = router;
