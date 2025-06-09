const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  assignUsersToTask,
  getAssigneesOfTask
} = require('../controllers/assignmentController');

router.post('/assign', auth, assignUsersToTask);
router.get('/task/:taskId', auth, getAssigneesOfTask);

module.exports = router;