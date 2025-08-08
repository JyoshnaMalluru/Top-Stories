  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  }

  window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const allButtons = document.querySelectorAll(".bookmark-btn");

    allButtons.forEach(btn => {
        const url = btn.dataset.url;
        const isBookmarked = bookmarks.some(item => item.url === url);
        if (isBookmarked) {
        btn.classList.add("bookmarked");
        } else {
        btn.classList.remove("bookmarked");
        btn.textContent = "🔖"; // 👈 Reset icon if not bookmarked
        }
    });
};
  function showAlert(message, type = 'secondary') {
    const alertArea = document.getElementById("alert-area");
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.role = "alert";
    alert.innerHTML = `<h5 class="alert-heading">${message}</h5>`;
    alertArea.innerHTML = ''; // Clear previous alerts
    alertArea.appendChild(alert);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
  function toggleBookmark(btn) {
    const title = btn.dataset.title;
    const url = btn.dataset.url;
    const source = btn.dataset.source;
    const date = btn.dataset.date;

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const exists = bookmarks.find(item => item.url === url);

    if (exists) {
      bookmarks = bookmarks.filter(item => item.url !== url);
      showAlert("Removed from bookmarks", "warning");
      btn.classList.remove("bookmarked");
    } else {
      bookmarks.push({ title, url, source, date });
      showAlert("Bookmarked!", "success");
      btn.classList.add("bookmarked");
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function markAlreadyBookmarked() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const buttons = document.querySelectorAll(".bookmark-btn");

    buttons.forEach(btn => {
      const url = btn.dataset.url;
      if (bookmarks.find(item => item.url === url)) {
        btn.classList.add("bookmarked");
      }
    });
  }

  window.addEventListener("DOMContentLoaded", markAlreadyBookmarked);
