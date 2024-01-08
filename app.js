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

  async function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again.");
    }
  }
});
