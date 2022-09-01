const { Router } = require("express");
const tagController = require("../controllers/tagController");


const router = new Router();


// routes already have "api/tags" prefix
router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getOneTag);
router.post("/", tagController.createTag);
router.patch("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

// TODO  FINISH THOSES 2 ROUTES BELOW
// router.put("/cards/:cardId/tags/:tagId", tagController.addTagToCard);
// router.delete("/cards/:cardId/tags/:tagId", tagController.removeTagFromCard);


module.exports = router;
