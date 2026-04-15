// app.js

const express = require("express");
const path = require("path");
const booksRoutes = require("./routes/books.routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use(booksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
