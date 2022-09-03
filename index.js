require("dotenv").config();

const express = require("express");
const cors =require("cors");
const router = require("./app/routers");
const app = express();


app.get("/", function(req, res) {
  res.send("Bienvenue sur kanban-app!");
});

// parsing info through body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", cors({ //autorisation des cross origin requests uniquement pour les routes de l'API
  origin: "*" // ici, j'autorise tout le monde mais je pourrais aussi (pour plus de sécurité!)ne whitelister que certains clients définis à l'avance
}), router);

// start the app
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\x1b[1;33m\u26a1Running server on : http://localhost:${port} \u26a1\x1b[0m`);
});