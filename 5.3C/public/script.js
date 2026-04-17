document.getElementById('loadBooks').addEventListener('click', async () => {
  const res = await fetch('/api/books');
  const books = await res.json();

  const list = document.getElementById('bookList');
  list.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} ${parseFloat(book.price)} AUD`;
    li.onclick = () => loadBook(book._id);
    list.appendChild(li);
  });
});

async function loadBook(id) {
  const res = await fetch(`/api/books/${id}`);
  const book = await res.json();

  document.getElementById('bookDetails').innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Summary:</strong> ${book.summary}</p>
    <p><strong>Price:</strong> ${parseFloat(book.price)} AUD</p>
  `;
}
