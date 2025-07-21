// HostPage.jsx
import React, { useEffect, useState } from 'react';
import { socket } from '../Socket';
import { useParams } from 'react-router-dom';

function HostPage() {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [buzzedPlayer, setBuzzedPlayer] = useState(null);

  useEffect(() => {
    socket.emit('create_room', roomCode); // Optional if not already created in HomePage

    socket.on('players_updated', (updatedPlayers) => {
      console.log('Updated players list:', updatedPlayers);
      setPlayers(updatedPlayers);
    });

    socket.on('buzzed', (player) => {
      setBuzzedPlayer(player);
    });

    return () => {
      socket.off('players_updated');
      socket.off('buzzed');
    };
  }, [roomCode]);

  const handleReset = () => {
    socket.emit('reset_buzzer', roomCode);
  };

  return (
    <div className="container">
      <h2>Host Room: {roomCode}</h2>

      <h3>Players:</h3>
      <ul>
        {players.map((player, idx) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>

      <h3>Buzzed:</h3>
      {buzzedPlayer ? <p>{buzzedPlayer.name} buzzed!</p> : <p>No one has buzzed yet</p>}

      <button onClick={handleReset}>Reset Buzzer</button>
    </div>
  );
}

export default HostPage;
