#! /usr/bin/env node

import express from 'express'
import http from 'http'
import path from 'path';
import { Server } from 'socket.io';

import companiesData from './src/fixtures/companiesData.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(process.cwd(), 'public')));


const stepTime = 120; // Время на ход

const state = {
  currentTime: stepTime,
  companies: companiesData,
};

const startTimer = (currentTime) => setTimeout(() => {
  state.currentTime = currentTime;
  io.emit('sendTime', currentTime);
  if (currentTime === 0) {
    startTimer(stepTime);
  } else {
    startTimer(currentTime - 1);
  }
}, 1000);
startTimer(stepTime);

io.on('connection', (socket) => {
  socket.on('getTime', () => {
    socket.emit('sendTime', state.currentTime);
  })
});
app.get('/', (_req, res) => res.sendFile(`${path.join(process.cwd())}/public/index.html`));

app.get('/api/data', (_req, res) => {
  res
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ companies: state.companies });
});

server.listen(5001, () => {
  console.log('listening on *:5001');
});