const { Router } = require("express");
const listController = require("../controllers/listController");

const router = new Router();



router.get("/", listController.getAllLists);




module.exports = router;