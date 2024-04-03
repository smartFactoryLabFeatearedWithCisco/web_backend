const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("path");

const app = express();
var path = require("path");

// app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  path: "/socket.io/",
});

var macineRouter = require("./routes/macineHandler");
var overViewRouter = require("./routes/overviewHandler");
var administratorRouter = require("./routes/administratorHandler");

app.use("/macineDetail/", macineRouter);
app.use("/overView", overViewRouter);
app.use("/admin/", administratorRouter);

io.on("connection", (socket) => {
  console.log("successfully connected" + socket.id);
  //   socket.use(([event, ...args], next) => {});

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });

  io.emit("chat message", "hello");

  socket.to(socket.id).emit("chat message", "hey");

  socket.on("disconnection", () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log("server is running");
});
