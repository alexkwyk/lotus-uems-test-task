import { SocketContext } from ".";

const SocketProvider = ({ children, socket }) => {
  const subscribeTimer = (callback) => {
    socket.on('sendTime', (payload) => {
      const hours = (payload > 3599) ? Math.floor(payload / 3600) : 0;
      const minutes = (payload > 59) ? Math.floor(payload % 3600 / 60) : 0;
      const seconds = Math.floor(payload % 3600 % 60);
      const normalize = (time) => time > 10 ? `${time}` : `0${time}`;
      callback(`${normalize(hours)}:${normalize(minutes)}:${normalize(seconds)}`);
    });
  }
  return (
    <SocketContext.Provider value={{ subscribeTimer }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;