const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTasksByColumn,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.get('/:columnId', auth, getTasksByColumn);
router.post('/', auth, createTask);
router.put('/:taskId', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;