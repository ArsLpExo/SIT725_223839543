// Connect to the Socket.IO server
const socket = io();

// Map mood names to DOM elements
const moodButtons = document.querySelectorAll('.mood-btn');

const countEls = {
  Happy: document.getElementById('count-happy'),
  Stressed: document.getElementById('count-stressed'),
  Neutral: document.getElementById('count-neutral'),
  Tired: document.getElementById('count-tired')
};

const bubbleEls = {
  Happy: document.getElementById('bubble-happy'),
  Stressed: document.getElementById('bubble-stressed'),
  Neutral: document.getElementById('bubble-neutral'),
  Tired: document.getElementById('bubble-tired')
};

// Emit moodSelected when a button is clicked
moodButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const mood = btn.getAttribute('data-mood');
    socket.emit('moodSelected', mood);
  });
});

// Listen for moodUpdate from server
socket.on('moodUpdate', (moodCounts) => {
  // Update text counts
  Object.keys(moodCounts).forEach((mood) => {
    if (countEls[mood]) {
      countEls[mood].innerText = moodCounts[mood];
    }
  });

  // Adjust bubble sizes based on counts
  updateBubbleSizes(moodCounts);
});

function updateBubbleSizes(moodCounts) {
  const counts = Object.values(moodCounts);
  const max = Math.max(...counts, 1); // avoid division by zero

  Object.keys(moodCounts).forEach((mood) => {
    const bubble = bubbleEls[mood];
    if (!bubble) return;

    const value = moodCounts[mood];

    // Size between 30px and 110px based on relative count
    const minSize = 30;
    const maxSize = 110;
    const ratio = value / max;
    const size = minSize + (maxSize - minSize) * ratio;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
  });
}
