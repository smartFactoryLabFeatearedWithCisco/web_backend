const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("path");
const bodyParser = require("body-parser");
const { sendMessage } = require("./webex");
const cors = require("cors");

const annellingM = require("./dataSet/annellingM");
const coldMillingM = require("./dataSet/coldMillingM");
const cuttingHeightM = require("./dataSet/cuttingHeightM");
const cuttingWidthM = require("./dataSet/cuttingWidthM");
const deGassingM = require("./dataSet/deGassingM");
const holdingM = require("./dataSet/holdingM");
const meltingM = require("./dataSet/meltingM");
const overView = require("./dataSet/overView");
const slabCastingM = require("./dataSet/slabCastingM");
const tensionLevelingM = require("./dataSet/tensionLevelingM");

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  path: "/socket.io/",
});
var macineRouter = require("./routes/macineHandler");
var overViewRouter = require("./routes/overviewHandler");
var administratorRouter = require("./routes/administratorHandler");

app.use(bodyParser.json());
app.use("/macineDetail/", macineRouter);
app.use("/overView", overViewRouter);
app.use("/admin/", administratorRouter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("successfully connected" + socket.id);
  //   socket.use(([event, ...args], next) => {});

  socket.on("sensor Data", (msg) => {
    let data = JSON.parse(msg);
    let Name = data.Name;

    console.log(data);
    switch (Name) {
      case "annellingM":
        annellingM.push(msg);
        console.log(annellingM.length);
        break;
      case "coldMillingM":
        coldMillingM.push(msg);
        break;
      case "cuttingLengthM":
        cuttingHeightM.push(msg);
        break;
      case "cuttingWidthM":
        cuttingWidthM.push(msg);
        break;
      case "deGassingM":
        deGassingM.push(msg);
        break;
      case "holdingM":
        holdingM.push(msg);
        break;
      case "meltingM":
        meltingM.push(msg);
        break;
      case "overView":
        overView.push(msg);
        break;
      case "slabCasting":
        slabCastingM.push(msg);
        break;
      case "tensionLevelingM":
        tensionLevelingM.push(msg);
        break;
      default:
        console.log("nothing corrected");
    }
  });

  io.emit("sensor Data", "hello");

  socket.to(socket.id).emit("chat message", "hey");

  socket.on("disconnection", () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log("server is running");
});
