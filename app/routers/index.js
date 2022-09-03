const { Router } = require("express");
const listRouter = require("./listRouter");
const cardRouter = require("./cardRouter");
const tagsRouter = require("./tagRouter");

const mainRouter = new Router(); // le but est de séparer chaque router dans un fichiers différent

// routes already have "api" prefix
mainRouter.use("/lists",listRouter);
mainRouter.use("/cards",cardRouter); // TODO : find why the display of card Router isn't blue azul ?
mainRouter.use("/tags", tagsRouter);

module.exports = mainRouter;