const express = require('express');
const {
  getAllTopics,
  addTopic,
  updateTopic,
  deleteTopic,
} = require('../controllers/topicsController');

const router = express.Router();

router.get('/topics', getAllTopics);
router.post('/topics', addTopic);
router.put('/topics', updateTopic);
router.delete('/topics/:id', deleteTopic);

module.exports = router;
