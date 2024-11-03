import express from 'express';
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app) 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  }
})

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    console.log(data)
    let key = Object.keys(data)[0];
    let value = data[key];
    socket.broadcast.emit("receive_message", { [key]: value } )
  })
})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})