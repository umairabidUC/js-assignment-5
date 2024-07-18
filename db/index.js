const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'Umair',
  password: 'umair',
  database: 'topicsdb',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;