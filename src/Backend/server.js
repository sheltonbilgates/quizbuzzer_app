// server/server.js
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = 4000;

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  socket.on("create_room", (roomCode) => {
    if (rooms[roomCode]) {
      socket.emit("error_message", "Room already exists");
      return;
    }

    console.log(`Room created: ${roomCode}`);
    socket.join(roomCode);
    rooms[roomCode] = { players: [], buzzed: null };

    // Notify host of empty players list
    io.to(roomCode).emit("players_updated", []);
  });

  socket.on("join_room", ({ roomCode, name }) => {
    console.log(`${name} is joining room ${roomCode}`);
    if (!rooms[roomCode]) return;

    socket.join(roomCode);
    rooms[roomCode].players.push({ id: socket.id, name });
    console.log('Room player list:', rooms[roomCode].players);
    io.to(roomCode).emit("players_updated", rooms[roomCode].players);
  });

  socket.on("buzz", (roomCode) => {
    const room = rooms[roomCode];
    if (room && !room.buzzed) {
      room.buzzed = socket.id;
      const player = room.players.find((p) => p.id === socket.id);
      console.log(`Buzz received from ${player?.name} in room ${roomCode}`);
      io.to(roomCode).emit("buzzed", player);
    }
  });

  socket.on("reset_buzzer", (roomCode) => {
    if (rooms[roomCode]) {
      rooms[roomCode].buzzed = null;
      io.to(roomCode).emit("buzzed", null);
    }
  });

  socket.on("disconnect", () => {
    for (const roomCode in rooms) {
      const room = rooms[roomCode];
      room.players = room.players.filter((p) => p.id !== socket.id);
      io.to(roomCode).emit("players_updated", room.players);

      if (room.players.length === 0) {
        delete rooms[roomCode];
        console.log(`Room ${roomCode} deleted due to empty players`);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
