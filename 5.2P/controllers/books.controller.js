// controllers/books.controller.js

const booksService = require("../services/books.service");

function getAllBooks(req, res) {
  const all = booksService.getAllBooks();
  res.json(all);
}

function getBookById(req, res) {
  const { id } = req.params;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
}

module.exports = {
  getAllBooks,
  getBookById
};
