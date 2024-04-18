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
let machineId = {};

app.use(bodyParser.json());
app.use("/macineDetail/", macineRouter);
app.use("/overView", overViewRouter);
app.use("/admin/", administratorRouter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("successfully connected" + socket.id);
  socket.on("register", (msg) => {
    console.log(msg);
    machineId[msg] = socket.id;
    console.log(msg, socket.id);
  });
  let sentTimer = false;

  //   socket.use(([event, ...args], next) => {});

  socket.on("sensor Data", (msg) => {
    let data = JSON.parse(msg);
    let Name = data.Name;

    console.log(data);
    switch (Name) {
      case "annellingM":
        annellingM.push(data);
        if (data.elec_use < 10 && !sentTimer) {
          sendMessage("소둔로", data.elec_use, "전기 사용량");

          sentTimer = true;
        }
        break;
      case "coldMillingM":
        coldMillingM.push(data);
        break;
      case "cuttingLengthM":
        cuttingHeightM.push(data);
        break;
      case "cuttingWidthM":
        cuttingWidthM.push(data);
        break;
      case "deGassingM":
        deGassingM.push(data);
        break;
      case "holdingM":
        holdingM.push(data);
        break;
      case "meltingM":
        meltingM.push(data);
        if (data.elec_use < 10) {
          sendMessage("meltingM", data.elec_use, "전기 사용량");
        }
        break;
      case "overView":
        overView.push(data);
        break;
      case "slabCasting":
        slabCastingM.push(data);
        break;
      case "tensionLeveling":
        tensionLevelingM.push(data);
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
