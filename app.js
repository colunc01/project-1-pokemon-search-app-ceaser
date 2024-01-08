document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const pokemonResults = document.getElementById("pokemonResults");
  const previousSearches = document.getElementById("previousSearches");

  let previousResults = [];

  searchButton.addEventListener("click", handleSearch);
  clearButton.addEventListener("click", clearSearch);
  searchInput.addEventListener("focus", handleFocus);
});
