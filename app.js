document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const pokemonResults = document.getElementById("pokemonResults");
  const previousSearches = document.getElementById("previousSearches");
  const previousSearchesHeading = document.getElementById("hidden");

  let previousResults = [];

  searchButton.addEventListener("click", handleSearch);
  clearButton.addEventListener("click", clearSearch);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  async function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      alert("Please enter a valid search term.");
      return;
    }

    loadingSpinner.style.display = "block";

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const data = await response.json();

      pokemonResults.innerHTML = "";
      displayPokemon(data);

      previousResults.push(data);
      updatePreviousSearches();
    } catch (error) {
      alert("Error fetching data. Please try again.");
    } finally {
      loadingSpinner.style.display = "none";
    }
  }

  function clearSearch() {
    searchInput.value = "";
    pokemonResults.innerHTML = "";
    previousResults = [];
    updatePreviousSearches();
    previousSearchesHeading.classList.add("hidden");
  }

  function displayPokemon(pokemon) {
    // Create a container for the card
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("pokemon-card-container");

    // Create the actual card
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    // Add Pokemon image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("pokemon-image-container");
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    imageContainer.appendChild(pokemonImage);

    // Add Pokemon name
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("pokemon-name-container");
    const pokemonName = document.createElement("p");
    pokemonName.textContent = pokemon.name;
    nameContainer.appendChild(pokemonName);

    // Append image and name to the card
    pokemonCard.appendChild(imageContainer);
    pokemonCard.appendChild(nameContainer);

    // Append the card to the container
    cardContainer.appendChild(pokemonCard);

    // Append the container to the results section
    pokemonResults.appendChild(cardContainer);
  }

  function updatePreviousSearches() {
    // Display previous search results in the UI
    previousSearches.innerHTML = "";
    previousSearchesHeading.classList.remove("hidden");
    previousResults.forEach((result, index) => {
      const previousResultItem = document.createElement("div");
      previousResultItem.classList.add("previous-result-item");
      previousResultItem.innerHTML = `
      <img src="${result.sprites.front_default}" alt="${result.name}">
      <p>${result.name}</p>
        `;
      previousSearches.appendChild(previousResultItem);
    });
  }
});
