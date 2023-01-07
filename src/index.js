import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {io} from 'socket.io-client';

import store from './store/index.js'
import SocketProvider from './contexts/SocketProvider.jsx'
import App from './App.jsx';
import {setActiveCompanyId} from "./store/companiesSlice.js";


const socket = io();
socket.on('setActiveCompany', (payload) => {
  store.dispatch(setActiveCompanyId(payload));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App/>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);

