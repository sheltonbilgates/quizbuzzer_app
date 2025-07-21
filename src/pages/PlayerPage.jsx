import React, { useState, useEffect } from 'react';
import { socket } from '../Socket';
import { useParams } from 'react-router-dom';

function PlayerPage( {name} ) {
  const { roomCode } = useParams();




  const handleBuzz = () => {
    socket.emit('buzz', roomCode);
  };

  return (
    <div>
      
        <div>
          <h2>Click buzzer after hearing the question completely</h2>
          <p>Room: {roomCode}</p>
          <p>Name: {name}</p>
          <button onClick={handleBuzz}>BUZZ NOW</button>
        </div>
      
    </div>
  );
}

export default PlayerPage;
