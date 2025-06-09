const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getNotifications,
  markAsRead
} = require('../controllers/notificationController');

router.get('/', auth, getNotifications);
router.put('/:notificationId/read', auth, markAsRead);

module.exports = router;