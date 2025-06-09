const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBoard,
  getBoards,
  getBoardMembers,
  renameBoard,
  deleteBoard
} = require('../controllers/boardController');

router.post('/', auth, createBoard);
router.get('/', auth, getBoards);
router.get('/:boardId', auth, getBoardMembers);
router.put('/:boardId', auth, renameBoard);
router.delete('/:boardId', auth, deleteBoard);

module.exports = router;