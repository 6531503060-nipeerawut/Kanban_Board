const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { inviteUserToBoard } = require('../controllers/inviteController');

router.post('/', auth, inviteUserToBoard);

module.exports = router;