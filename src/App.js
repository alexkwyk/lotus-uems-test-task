import { useEffect, useState } from 'react';

const App = ({ socket }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    socket.on('sendTime', (payload) => {
      setCurrentTime(payload);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        {currentTime}
      </header>
    </div>
  );
}

export default App;
