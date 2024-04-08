var express = require("express");
var Router = express.Router();

Router.get("/:macineName/60", function (req, res) {
  console.log(req.params.macineName);
  const machine = require(`../dataSet/${req.params.macineName}`);
  let lastTen;
  if (machine.length > 60) lastTen = machine.slice(-60);
  else lastTen = machine.slice((machine.length - 1) * -1);
  console.log(machine);
  res.send(lastTen);
});

module.exports = Router;
