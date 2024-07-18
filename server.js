const express = require('express');
const cors = require('cors');
const topicsRoutes = require('./routes/topics');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', topicsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
