const { Router } = require("express");
const listRouter = require("./listRouter");
const cardRouter = require("./cardRouter");
const tagsRouter = require("./tagRouter");

// documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const mainRouter = new Router(); // le but est de séparer chaque router dans un fichiers différent


// routes already have "api" prefix
mainRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Setup the documentation

mainRouter.use("/lists",listRouter);
mainRouter.use("/cards",cardRouter);
mainRouter.use("/tags", tagsRouter);

module.exports = mainRouter;