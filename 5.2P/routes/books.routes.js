// routes/books.routes.js

const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller");

// Routes (no logic here)
router.get("/api/books", booksController.getAllBooks);
router.get("/api/books/:id", booksController.getBookById);

module.exports = router;
