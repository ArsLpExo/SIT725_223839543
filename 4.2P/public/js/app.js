document.addEventListener('DOMContentLoaded', () => {
  // Initialize Materialize modal
  const modals = document.querySelectorAll('.modal');
  // M.Modal.init(document.getElementById('add-book-modal'));

  M.Modal.init(modals);

  

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
          <p><strong>Author:</strong> ${item.author}</p>
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Price:</strong> $${item.price?.toFixed ? item.price.toFixed(2) : item.price}</p>
          <p><strong>Rating:</strong> ⭐ ${item.rating}</p>
        </div>
        <div class="card-action">
        <a class="btn-small red delete-btn" data-id="${item._id}">Delete</a>
        <a class="btn-small blue edit-btn" data-id="${item._id}">Edit</a>
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
        <p><strong>Author:</strong> ${item.author}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Price:</strong> $${item.price?.toFixed ? item.price.toFixed(2) : item.price}</p>
        <p><strong>Rating:</strong> ⭐ ${item.rating}</p>
      </div>
      <div class="card-action">
        <a class="btn-small red delete-btn" data-id="${item._id}">Delete</a>
        <a class="btn-small blue edit-btn" data-id="${item._id}">Edit</a>
        </div>
    </div>
  `;

  return col;
}

document.getElementById('submit-book-btn').addEventListener('click', () => {
  const title = document.getElementById('book_title').value.trim();
  const author = document.getElementById('book_author').value.trim();
  const image = document.getElementById('book_image').value.trim() || 'images/book2.jpg';
  const category = document.getElementById('book_category').value.trim();
  const price = parseFloat(document.getElementById('book_price').value);
  const rating = parseFloat(document.getElementById('book_rating').value) || 0;

  if (!title || !author || !category || isNaN(price)) {
    M.toast({html: 'Please fill all required fields', classes: 'red'});
    return;
  }

  fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, image, category, price, rating })
  })
  .then(res => res.json())
  .then(newBook => {
    const container = document.getElementById('cards-container');
    const card = createCard(newBook);
    container.appendChild(card);

    M.toast({html: 'Book added successfully!', classes: 'green'});

    const modal = M.Modal.getInstance(document.getElementById('add-book-modal'));
    modal.close();
    document.getElementById('add-book-form').reset();
  })
  .catch(err => {
    console.error('Error adding book:', err);
    M.toast({html: 'Error adding book', classes: 'red'});
  });
});

// DELETE BUTTON LISTENER 
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');

    await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });

    // Remove card from UI
    e.target.closest('.col').remove();
  }
});


// EDIT BUTTON LISTENER
let currentEditId = null;

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-btn')) {
    currentEditId = e.target.getAttribute('data-id');

    const res = await fetch('/api/items');
    const books = await res.json();
    const book = books.find(b => b._id === currentEditId);

    document.getElementById('edit_title').value = book.title;
    document.getElementById('edit_author').value = book.author;
    document.getElementById('edit_image').value = book.image;
    document.getElementById('edit_category').value = book.category;
    document.getElementById('edit_price').value = book.price;
    document.getElementById('edit_rating').value = book.rating;

    M.updateTextFields();

    const modal = M.Modal.getInstance(document.getElementById('edit-book-modal'));
    modal.open();
  }
});

// SAVE EDIT BUTTON LISTENER
document.getElementById('save-edit-btn').addEventListener('click', async () => {
  const updatedBook = {
    title: document.getElementById('edit_title').value,
    author: document.getElementById('edit_author').value,
    image: document.getElementById('edit_image').value,
    category: document.getElementById('edit_category').value,
    price: parseFloat(document.getElementById('edit_price').value),
    rating: parseFloat(document.getElementById('edit_rating').value)
  };

  const res = await fetch(`/api/items/${currentEditId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook)
  });

  if (res.ok) {
    M.toast({html: 'Book updated successfully!', classes: 'green'});
    loadBooks(); // reload cards
  } else {
    M.toast({html: 'Error updating book', classes: 'red'});
  }

  const modal = M.Modal.getInstance(document.getElementById('edit-book-modal'));
  modal.close();
});

function loadBooks() {
  fetch('/api/items')
    .then(res => res.json())
    .then(data => {
      renderCards(data);
    })
    .catch(err => console.error('Error loading books:', err));
}
