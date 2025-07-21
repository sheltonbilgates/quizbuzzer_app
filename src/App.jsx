import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HostPage from './pages/HostPage';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';

function App() {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const [isHost, setIsHost] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setRoomCode={setRoomCode} setName={setName} setIsHost={setIsHost} />} />
        <Route path="/host/:roomCode" element={<HostPage />} />
        <Route path="/player/:roomCode" element={<PlayerPage name={name}/>} />
      </Routes>
    </Router>
  );
}

export default App;