const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://127.0.0.1:27017/booksdb')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const sampleBooks = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    image: "https://covers.openlibrary.org/b/id/8099256-L.jpg",
    category: "Programming",
    price: 45.99,
    rating: 5
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "https://covers.openlibrary.org/b/id/9613601-L.jpg",
    category: "Programming",
    price: 39.99,
    rating: 5
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://covers.openlibrary.org/b/id/10958339-L.jpg",
    category: "Self-Help",
    price: 29.99,
    rating: 4
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    category: "Fantasy",
    price: 25.50,
    rating: 5
  },
  {
    title: "1984",
    author: "George Orwell",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    category: "Dystopian",
    price: 19.99,
    rating: 4
  }
];

async function seed() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
