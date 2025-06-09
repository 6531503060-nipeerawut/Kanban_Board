const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createColumn,
  updateColumn,
  deleteColumn,
  getColumnsByBoard
} = require('../controllers/columnController');

router.post('/', auth, createColumn);
router.get('/:boardId', auth, getColumnsByBoard);
router.put('/:columnId', auth, updateColumn);
router.delete('/:columnId', auth, deleteColumn);

module.exports = router;