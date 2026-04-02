const express = require('express');
const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Sample data (change to your domain)
const items = [
  {
    id: 1,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    image: 'images/book1.png'
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: 'images/book2.jpg'
  }
];

// Simple GET REST endpoint
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
