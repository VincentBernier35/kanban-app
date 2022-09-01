const { Router } = require("express");
const listRouter = require("./listRouter");



const mainRouter = new Router(); // le but est de séparer chaque router dans un fichiers différent




mainRouter.use("/lists", listRouter);



module.exports = mainRouter;