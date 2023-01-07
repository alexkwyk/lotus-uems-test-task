import React, {useEffect, useState} from 'react';
import {useSocket} from '../contexts/index';
import hourglass from '../assets/hourglass.svg';

export default function Timer() {
  const [currentTime, setCurrentTime] = useState(null);
  const socket = useSocket();
  useEffect(() => {
    socket.subscribeTimer(setCurrentTime);
  }, [socket]);

  return (
    currentTime &&
    (<div className="py-3 text-danger text-center bg-danger bg-opacity-10">
      <span className="fw-bold">{currentTime}</span>
      <img src={hourglass} className="float-end p-1" alt="" />
    </div>)
  );
}
