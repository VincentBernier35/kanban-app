const { Router } = require("express");
const listController = require("../controllers/listController");

const router = new Router();


// routes already have "api/lists" prefix
router.get("/", listController.getAllLists);
router.get("/:id", listController.getOneList);
router.post("/", listController.createList);
router.patch("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);




module.exports = router;