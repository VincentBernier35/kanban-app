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
  console.log(`\x1b[1;33m\u26a1Running server on : http://localhost:${port} \u26a1\x1b[0m`);
});