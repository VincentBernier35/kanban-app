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

//404
mainRouter.use(notFoundMiddleware);

function notFoundMiddleware(req, res, next) {
  res.status(404).json({error: "resource not found !"});
  next(); // in case there would be another middleware
}



module.exports = mainRouter;