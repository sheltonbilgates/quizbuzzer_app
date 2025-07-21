import React, { useState } from 'react';
import { socket } from '../Socket';
import { useNavigate } from 'react-router-dom';

function HomePage({ setRoomCode, setName, setIsHost }) {
  const [localName, setLocalName] = useState('');
  const [localCode, setLocalCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!localCode || !localName) return;
    setRoomCode(localCode);
    setName(localName);
    socket.emit('join_room', { roomCode: localCode, name: localName });
    navigate(`/player/${localCode}`);
  };

  const handleCreate = () => {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomCode(code);
    setIsHost(true);
    socket.emit('create_room', code);
    navigate(`/host/${code}`);
  };

  return (
    <div className="container">
      <h2>Join or Create Game</h2>
      <input placeholder="Your Name" onChange={e => setLocalName(e.target.value)} />
      <input placeholder="Room Code" onChange={e => setLocalCode(e.target.value.toUpperCase())} />
      <button onClick={handleJoin}>Join Room</button>
      <hr />
      <button onClick={handleCreate}>Create Room</button>
    </div>
  );
}

export default HomePage;