import { useEffect, useState } from 'react';
import { useSocket } from '../contexts';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const socket = useSocket()
  useEffect(() => {
    socket.subscribeTimer(setCurrentTime);
  }, []);

  return (<div className="bg-danger bg-opacity-25 align-middle" style={{height: '3rem'}}>
    <span>{currentTime}</span>
    </div>);
}

export default Timer;