// Execute the following code when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Gets references to a different elements by their IDs
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");
  const createTeam = document.getElementById('createTeam'); // creates team
  const teamResults = document.getElementById("teamResults");
  const teamHeading = document.getElementById("teamHeading"); 
  const clearTeamButton = document.getElementById("clearTeam"); 
  const loadingSpinner = document.getElementById("loadingSpinner");
  const pokemonResults = document.getElementById("pokemonResults");
  const previousSearches = document.getElementById("previousSearches");
  const previousSearchesHeading = document.getElementById("hidden");
  const rightClickContainer = document.getElementById("rightClickContainer");
  const abilityContainer = document.getElementById("abilityContainer");
  const abilityResults = document.getElementById("abilityResults");

  // Store previous search results
  let previousResults = [];

  //Add event listeners to buttons and search input
  searchButton.addEventListener("click", handleSearch);
  clearButton.addEventListener("click", clearSearch);
  createTeam.addEventListener("click", createsYourTeam);
  clearTeamButton.addEventListener("click", clearTeam);
  abilityResults.addEventListener("oncontextmenu", displayAbilities);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // Asynchronous function to handle the search of the API
  async function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Checks if the Search Term is empty
    if (searchTerm === "") {
      alert("Please enter a valid Pokemon name.");
      return;
    }

    // Displays a loading spinner
    loadingSpinner.style.display = "block";

    // Calls the fetch function
    fetchPokemon(searchTerm, false, false);
  }

  // Fetch function to be called to get pokemon
  async function fetchPokemon(searchTerm, isTeamSearch = false, getAbilities = false){
    try {
      // Fetch Pokemon data based on the search term
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const data = await response.json();

      if(getAbilities){
        displayAbilities(data);
      } else {
        console.log(searchTerm);
        console.log(data);

        // MAYBE: add something to detemine if search or team;
        if(!isTeamSearch){
          // Clear previous results and display current result
          pokemonResults.innerHTML = "";
          displayPokemon(data);
          // Save the current search result to history
          previousResults.push(data);
          updatePreviousSearches();
        } else {
          displayTeam(data);
        }  
      }
    } catch (error) {
      alert("Error: Pokemon Doesn't Exist. Please try again.");
    } finally {
      // Hides loading spinner
      loadingSpinner.style.display = "none";
    }
  }

  // Function is called that would get 5 random pokemon and fetch 3 attributes of each
  async function createsYourTeam(){
    const randomPokemonIds = Array.from({length: 6}, () =>
    Math.floor(Math.random()*700) + 1 // Assuming 700 are the maximum amount of pokemon
    );

    // Clear previous team results
    teamResults.innerHTML = "";

    for (let i=0; i<randomPokemonIds.length; i++){
      await fetchPokemon(randomPokemonIds[i], true);
    }

    // Show team container
    teamHeading.classList.remove("hidden");
    clearTeamButton.classList.remove("hidden");
  }

  // Function that clears the randomly generated team
  async function clearTeam(){
    teamResults.innerHTML = "";
    teamHeading.classList.add("hidden");
    clearTeamButton.classList.add("hidden");
  }

  // Displays the Randomly Generated Pokemon Team
  function displayTeam(pokemon){
    // Create a container for the card
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("pokemon-card-container", "team-card"); // Add "team-card" class

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

    // Add Pokemon weight
    const weightContainer = document.createElement("div");
    weightContainer.classList.add("pokemon-weight-container");
    const pokemonWeight = document.createElement("p");
    pokemonWeight.textContent = pokemon.id;
    weightContainer.appendChild(pokemonWeight);

    // Append image and name to the card
    pokemonCard.appendChild(imageContainer);
    pokemonCard.appendChild(nameContainer);
    pokemonCard.appendChild(weightContainer);

    // Append the card to the container
    cardContainer.appendChild(pokemonCard);

    // Append the container to the team results section
    teamResults.appendChild(cardContainer);
  }

  // Function that will display pokemon abilities when right clicked
  async function displayAbilities(){
    console.log("click");

    // function(event){
    //   console.log("right clik");
    //   event.preventDefault();
    //   const targetPokeonCard = event.target.closest(".pokemon-card-container");
  
    //   if(targetPokeonCard){
    //     const pokemonName = targetPokeonCard.querySelector(
    //       ".pokemon-name-container p"
    //     ).textContent;
  
    //     //Fetch Pokemon details again to get abilities
    //     fetchPokemon(pokemonName, false, true);
    //   }}

    // console.log("HEY INSIDE RIGHT CLICK FUNCTION");
    // const abilityHeading = document.getElementById("abilityHeading");

    // //clear previous abilities
    // rightClickContainer.innerHTML = "";
    // abilityHeading.classList.remove("hidden");

    // //Display each ability
    // pokemon.abilities.forEach((ability) => {
    //   const abilityItem = document.createElement("p");
    //   abilityItem.textContent = ability.ability.name;
    //   abilityContainer.appendChild(abilityItem);
    // });

    // //Display the right click container
    // rightClickContainer.style.top ='${event.clientY}px';
    // rightClickContainer.style.left='${event.clientX}px';
    // rightClickContainer.style.display="block";

    // //Close right click container on any click outside of it
    // document.addEventListener("click", function(event){
    //   if(!rightClickContainer.contains(event.target)){
    //     rightClickContainer.style.display = "none";
    //   }
    // });
  }

  // Clear the search input and results
  async function clearSearch() {
    searchInput.value = ""; 
    pokemonResults.innerHTML = "";
    previousResults = [];
    updatePreviousSearches();
    previousSearchesHeading.classList.add("hidden");
    clearTeamButton.classList.add("hidden");
  }

  // Display Pokemon Details
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

    // Add Pokemon weight
    const weightContainer = document.createElement("div");
    weightContainer.classList.add("pokemon-weight-container");
    const pokemonWeight = document.createElement("p");
    pokemonWeight.textContent = pokemon.id;
    weightContainer.appendChild(pokemonWeight);

    // Append image and name to the card
    pokemonCard.appendChild(imageContainer);
    pokemonCard.appendChild(nameContainer);
    pokemonCard.appendChild(weightContainer);

    // Append the card to the container
    cardContainer.appendChild(pokemonCard);

    // Append the container to the results section
    pokemonResults.appendChild(cardContainer);
  }

  // Update the UI with previous search results and displays them
  function updatePreviousSearches() {
    previousSearches.innerHTML = "";
    previousSearchesHeading.classList.remove("hidden");
    previousResults.forEach((result) => {
      const previousResultItem = document.createElement("div");
      previousResultItem.classList.add("previous-result-item");
      const img = document.createElement("img");
      img.src = result.sprites.front_default;
      previousResultItem.appendChild(img);

      const name = document.createElement("p");
      name.textContent = result.name;
      previousResultItem.appendChild(name);

      previousSearches.appendChild(previousResultItem);
    });
  }
});