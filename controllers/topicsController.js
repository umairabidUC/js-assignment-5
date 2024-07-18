const pool = require('../db/index');

// Get all topics
const getAllTopics = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM topics');
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting topics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new topic
const addTopic = async (req, res) => {
  const { Topic, Duration, Link, Id, Status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO topics (topic, duration, link, id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [Topic, Duration, Link, Id, Status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding topic:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a topic
const updateTopic = async (req, res) => {
  const { Id, Topic, Duration, Link } = req.body;
  try {
    const result = await pool.query(
      'UPDATE topics SET topic = $1, duration = $2, link = $3 WHERE id = $4 RETURNING *',
      [Topic, Duration, Link, Id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating topic:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a topic
const deleteTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await pool.query('DELETE FROM topics WHERE id = $1 RETURNING *', [id]);
    res.status(204).json(del.rows[0]);
  } catch (err) {
    console.error('Error deleting topic:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllTopics,
  addTopic,
  updateTopic,
  deleteTopic,
};
