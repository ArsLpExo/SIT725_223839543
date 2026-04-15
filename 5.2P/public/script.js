// public/script.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/books")
    .then((res) => res.json())
    .then((books) => {
      const list = document.getElementById("books-list");
      list.innerHTML = "";

      books.forEach((book) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="title">${book.title}</span>
          <span class="author"> by ${book.author}</span>
        `;
        list.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
    });
});
