var express = require("express");
var Router = express.Router();

Router.get("/:macineName/data1Min", function (req, res) {
  console.log(req.params.macineName);
  const machine = require(`../dataSet/${req.params.macineName}`);
  let lastTen;
  if (machine.length > 60) lastTen = machine.slice(-60);
  else lastTen = machine.slice((machine.length - 1) * -1);
  console.log(machine);
  res.send(lastTen.reverse());
});

Router.get("/:macineName/carbon", function (req, res) {
  const machine = require(`../dataSet/${req.params.macineName}`);
  let carbon;
  carbon = machine[machine.length - 1];
  if (carbon.elec_use !== undefined) {
    carbon.elec_use = carbon.elec_use * 0.2;
  }

  res.send(carbon);
});

module.exports = Router;
