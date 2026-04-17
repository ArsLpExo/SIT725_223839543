const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection (hardcoded as required)
mongoose.connect('mongodb://127.0.0.1:27017/booksdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/books', booksRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
