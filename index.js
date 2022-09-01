require("dotenv").config();

const express = require("express");
const router = require("./app/routers");
const app = express();


app.get("/", function(req, res) {
  res.send("Bienvenue sur kanban-app!");
});
app.use("/api", router);

// start the app
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});