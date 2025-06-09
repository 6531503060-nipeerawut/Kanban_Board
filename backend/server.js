const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// เก็บ map userId -> socketId
const userSocketMap = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (let [uid, sid] of userSocketMap.entries()) {
      if (sid === socket.id) {
        userSocketMap.delete(uid);
        break;
      }
    }
    console.log('Client disconnected');
  });
});

global.io = io;
global.userSocketMap = userSocketMap;

server.listen(5002, () => {
  console.log('Server running on port 5002');
});
