// const Book = require('../models/book.model');

// exports.getAllBooks = () => Book.find({});
// exports.getBookById = (id) => Book.findById(id);

const Book = require('../models/book.model');

exports.getAllBooks = async () => {
  const books = await Book.find({});

  return books.map(book => ({
    _id: book._id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    summary: book.summary,
    image: book.image,
    price: book.price.toString()   // <-- FIX
  }));
};

exports.getBookById = async (id) => {
  const book = await Book.findById(id);

  if (!book) return null;

  return {
    _id: book._id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    summary: book.summary,
    image: book.image,
    price: book.price.toString()   // <-- FIX
  };
};
