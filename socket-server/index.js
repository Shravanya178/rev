const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("message", (data) => {
    // broadcast
    io.emit("message", data);
  });
  socket.on("disconnect", () => console.log("disconnected", socket.id));
});

server.listen(4000, () => console.log("socket server on 4000"));
