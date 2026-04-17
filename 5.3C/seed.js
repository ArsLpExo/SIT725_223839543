const mongoose = require('mongoose');
const Book = require('./models/book.model');

mongoose.connect('mongodb://127.0.0.1:27017/booksdb');

const books = [
  {
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    year: 2006,
    genre: "Sci-Fi",
    summary: "A mind-bending first-contact novel.",
    image: "images/book1.jpg",
    price: 29.99
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "A gothic romance novel.",
    image: "images/book2.jpg",
    price: 22.00
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    summary: "A classic novel about manners and marriage.",
    image: "images/book3.jpg",
    price: 22.00
  },
  {
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "A story of love and loss during WWII.",
    image: "images/book4.jpg",
    price: 25.39
  },
  {
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "A satirical fantasy novel from Discworld.",
    image: "images/book5.jpg",
    price: 31.99
  }
];

async function seed() {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("Database seeded");
  process.exit();
}

seed();
