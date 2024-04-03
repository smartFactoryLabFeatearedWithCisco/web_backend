var express = require("express");
var Router = express.Router();

Router.get("/", function (req, res) {
  res.send("detail About machines");
});

module.exports = Router;
