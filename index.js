require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors =require("cors");
const router = require("./app/routers");
const app = express();

// Add rate limit policy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);


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