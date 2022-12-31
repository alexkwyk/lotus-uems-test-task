#! /usr/bin/env node

import express from 'express'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentTime = 120;

app.get('/', (req, res) => {
  res.send('')
});

io.on('connection', (socket) => {
  socket.on('getTime', () => {
    socket.emit('sendTime', currentTime);
  })
});

const startTimer = () => setTimeout(() => {
  if (currentTime === 0) {
    currentTime = 120;
  }
  currentTime -= 1;
  console.log(currentTime);
  io.emit('sendTime', currentTime);
  startTimer();
}, 1000);
startTimer();

server.listen(5001, () => {
  console.log('listening on *:5001');
});

export { io }