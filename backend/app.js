const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');
const columnRoutes = require('./routes/columnRoutes');
const tagRoutes = require('./routes/tagRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const inviteRoutes = require('./routes/inviteRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/invite', inviteRoutes);

module.exports = app;