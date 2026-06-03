const express = require('express');
const forecastRoute = require('./routes/forecast');

const app = express();
app.use(express.json());

app.use('/api/forecast', forecastRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

