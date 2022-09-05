const { Router } = require("express");
const cardController = require("../controllers/cardController");
const cw = require("./controllerErrorWrapper");

const router = new Router();

// routes already have "api/cards" prefix
router.get("/", cw(cardController.getAllCards));
router.get("/:id", cw(cardController.getOneCard));
router.post("/", cw(cardController.createCard));
router.patch("/:id", cw(cardController.updateCard));
router.delete("/:id", cw(cardController.deleteCard));

router.put("/:cardId/tags/:tagId", cw(cardController.addTagToCard));
router.delete("/:cardId/tags/:tagId", cw(cardController.removeTagFromCard));



module.exports = router;