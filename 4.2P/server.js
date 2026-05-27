const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookLibraryDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


//JSON parser middleware
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Sample data (change to your domain)
const items = [
  {
    id: 1,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    image: 'images/book1.png'
  }
];

//POST route
app.post('/api/items', async (req, res) => {
  try {
    const { title, author, image, category, price, rating } = req.body;

    const newBook = await Book.create({
      title,
      author,
      image,
      category,
      price,
      rating
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(400).json({ error: err.message });
  }
});




//GET REST endpoint
app.get('/api/items', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// DELETE` route
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



