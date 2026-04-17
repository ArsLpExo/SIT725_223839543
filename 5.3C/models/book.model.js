const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  image: String,
  price: mongoose.Schema.Types.Decimal128
});

module.exports = mongoose.model('Book', BookSchema);
