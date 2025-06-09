const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTag,
  getAllTags,
  assignTagToTask,
  removeTagFromTask,
  getTagsByTask
} = require('../controllers/tagController');

router.post('/', auth, createTag);
router.get('/', auth, getAllTags);

router.post('/assign', auth, assignTagToTask);
router.post('/remove', auth, removeTagFromTask);
router.get('/task/:taskId', auth, getTagsByTask);

module.exports = router;