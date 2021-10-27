// anonymous function || fat arrow syntax es6

const randomOffset = Math.floor(Math.random() * 100);
const API_POKEMON = `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${randomOffset}`;
const arrPokemons = []


const createPokeCards = (dataPokemon) => {
  const container = document.querySelector('.pokemonNameList')
  const card = document.createElement("div")
  card.innerHTML =  `
    <div class="card mb-4 container-fluid card-custom">
      <img src="${dataPokemon.img}" alt="">
      <div class="card-body">
    <h5 class="card-title">${dataPokemon.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
    </div>
  `

  container.appendChild(card)
}

const fetchDetails = (data) => {
  fetch(data.url).then(res => {
    res.json().then(details => {
      data.img = details.sprites.front_default;
      createPokeCards(data);
    })
  })
}


const fetchPokemons = () => {
  // javascript adalah single thread
  // asynchronous programming
  // reference: Promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then?retiredLocale=id
  fetch(API_POKEMON).then(res => {
    // parse data json
    res.json().then(item => {
      item.results.forEach(poke => {

        const pokeDetail = {
          name: poke.name,
          url: poke.url
        }
        arrPokemons.push(pokeDetail)
      })
      arrPokemons.forEach(pokemon => {
        fetchDetails(pokemon)
      })
    })
  })
}

window.onload = function () {
  fetchPokemons()
}