document.addEventListener('DOMContentLoaded', () => {
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
