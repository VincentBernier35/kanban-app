const { Router } = require("express");
const cardController = require("../controllers/cardController");

const router = new Router();

// routes already have "api/cards" prefix
router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getOneCard);
router.post("/", cardController.createCard);
router.patch("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

router.put("/:cardId/tags/:tagId", cardController.addTagToCard);
router.delete("/:cardId/tags/:tagId", cardController.removeTagFromCard);



module.exports = router;