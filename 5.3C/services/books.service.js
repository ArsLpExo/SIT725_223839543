const Book = require('../models/book.model');

exports.getAllBooks = () => Book.find({});
exports.getBookById = (id) => Book.findById(id);
