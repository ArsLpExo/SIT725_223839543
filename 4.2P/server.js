const express = require('express');
const app = express();
const port = 3000;

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
app.post('/api/items', (req, res) => {
  const newBook = {
    id: items.length + 1,
    title: req.body.title,
    author: req.body.author,
    image: req.body.image
  };

  items.push(newBook);
  res.json(newBook);
});

//GET REST endpoint
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
