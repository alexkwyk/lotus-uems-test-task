#! /usr/bin/env node

import express from 'express'
import http from 'http'
import path from 'path';
import { Server } from 'socket.io';

import companiesData from './src/assets/fixtures/companiesData.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(process.cwd(), 'public')));

const stepTime = 120; // Время на ход

const state = {
  currentTime: stepTime,
  activeCompanyId: 1,
  companies: companiesData,
};

const startTimer = () => setTimeout(() => {
  io.emit('sendTime', state.currentTime);
  if (state.currentTime === 0) {
    state.currentTime = stepTime;
    switchActiveCompany();
  } else {
    state.currentTime -= 1;
  }
  startTimer();
}, 1000);

startTimer();

io.on('connection', (socket) => {
  socket.emit('sendTime', state.currentTime);
  socket.emit('setActiveCompany', state.activeCompanyId);
  socket.on('switchActiveCompany', () => {
    switchActiveCompany();
    state.currentTime = stepTime;
    socket.emit('setActiveCompany', state.activeCompanyId);
  })
});

const switchActiveCompany = () => {
  const { companies, activeCompanyId } = state;
  const nextCompanyId = (
    (companies[companies.length - 1].id === activeCompanyId)
      ? companies[0].id : activeCompanyId + 1);
  state.activeCompanyId = nextCompanyId;
  io.emit('setActiveCompany', nextCompanyId);
};



app.get('/', (_req, res) => res.sendFile(`${path.join(process.cwd())}/public/index.html`));

app.get('/api/data', (_req, res) => {
  res
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ companies: state.companies });
});

server.listen(5001, () => {
  console.log('listening on *:5001');
});
