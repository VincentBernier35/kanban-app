const { Router } = require("express");
const listRouter = require("./listRouter");
const cardRouter = require("./cardRouter");



const mainRouter = new Router(); // le but est de séparer chaque router dans un fichiers différent




mainRouter.use("/lists", listRouter);
mainRouter.use("/cards", cardRouter);



module.exports = mainRouter;