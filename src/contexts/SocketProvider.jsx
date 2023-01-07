import React from 'react';
import { SocketContext } from './index';

function SocketProvider({ children, socket }) {
  const subscribeTimer = (callback) => {
    socket.on('sendTime', (payload) => {
      const hours = (payload > 3599) ? Math.floor(payload / 3600) : 0;
      const minutes = (payload > 59) ? Math.floor((payload % 3600) / 60) : 0;
      const seconds = Math.floor((payload % 3600) % 60);
      const normalize = (time) => (time > 9 ? `${time}` : `0${time}`);
      callback(`${normalize(hours)}:${normalize(minutes)}:${normalize(seconds)}`);
    });
  };
  const switchActiveCompany = () => {
    socket.emit('switchActiveCompany');
  }

  const providerValue = { subscribeTimer, switchActiveCompany };
  return (
    <SocketContext.Provider value={providerValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
