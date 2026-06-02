const express = require('express');
const app = express();
const http = require('http').createServer(app); // HTTP server from app
const { Server } = require('socket.io');
const io = new Server(http);

// Serve static files from /public
app.use(express.static('public'));

// In-memory mood counts
let moodCounts = {
  Happy: 0,
  Stressed: 0,
  Neutral: 0,
  Tired: 0
};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send current mood counts to the newly connected client
  socket.emit('moodUpdate', moodCounts);

  // Listen for mood selections from this client
  socket.on('moodSelected', (mood) => {
    if (moodCounts[mood] !== undefined) {
      moodCounts[mood] += 1;
      console.log(`Mood selected: ${mood}`, moodCounts);

      // Broadcast updated counts to all clients
      io.emit('moodUpdate', moodCounts);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Basic route (optional, since we serve static)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
