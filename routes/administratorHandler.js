var express = require("express");
var Router = express.Router();

Router.get("/", function (req, res) {
  res.send("melting");
});

module.exports = Router;
