const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
