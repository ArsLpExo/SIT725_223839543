document.addEventListener('DOMContentLoaded', () => {
  // Initialize Materialize modal
  const modal = document.getElementById('add-book-modal');
  M.Modal.init(modal);

  fetch('/api/items')
    .then(response => response.json())
    .then(data => {
      renderCards(data);
    })
    .catch(err => {
      console.error('Error fetching items:', err);
    });
});

function renderCards(items) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  items.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col s12 m6 l4';

    col.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${item.image}" alt="${item.title}">
          <span class="card-title">${item.title}</span>
        </div>
        <div class="card-content">
          <p>Author: ${item.author}</p>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function createCard(item) {
  const col = document.createElement('div');
  col.className = 'col s12 m6 l4';

  col.innerHTML = `
    <div class="card">
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}">
        <span class="card-title">${item.title}</span>
      </div>
      <div class="card-content">
        <p>Author: ${item.author}</p>
      </div>
    </div>
  `;

  return col;
}

document.getElementById('add-book-btn').addEventListener('click', () => {
  const modal = M.Modal.getInstance(document.getElementById('add-book-modal'));
  modal.open();
});

document.getElementById('submit-book-btn').addEventListener('click', () => {
  const title = document.getElementById('book_title').value.trim();
  const author = document.getElementById('book_author').value.trim();
  const image = document.getElementById('book_image').value.trim() || 'images/book2.jpg';

  if (!title || !author) {
    alert('Please fill in all required fields');
    return;
  }

  fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      author: author,
      image: image
    })
  })
    .then(res => res.json())
    .then(newBook => {
      const container = document.getElementById('cards-container');
      const card = createCard(newBook);
      container.appendChild(card);

      // Close modal and reset form
      const modal = M.Modal.getInstance(document.getElementById('add-book-modal'));
      modal.close();
      document.getElementById('add-book-form').reset();
    })
    .catch(err => console.error('Error adding book:', err));
});



