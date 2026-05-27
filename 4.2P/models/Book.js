const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
