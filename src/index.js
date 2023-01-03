import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import store from './slices/index.js'
import SocketProvider from './contexts/SocketProvider.jsx'
import App from './App.jsx';


const socket = io();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App socket={socket} />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);

