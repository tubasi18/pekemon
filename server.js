const express = require("express");
const app = express();

app.set("view engine", "ejs");

const MAX_POKEMON = 3,
  LIMIT = 151,
  POKEMON_API = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`;

function getThreeRandomPokemon(results) {
  let result = [];
  for (let i = 0; i < MAX_POKEMON; i++) {
    let random = Math.floor(Math.random() * LIMIT);
    result.push(results[random]);
  }
  return result;
}

async function fetchData() {
  const response = await fetch(POKEMON_API),
    data = await response.json();
  return getThreeRandomPokemon(data.results);
}

async function fetchPokemon(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const response = await fetch(data[i].url),
      pokemon = await response.json();
    result.push({
      name: data[i].name,
      order: pokemon.order,
    });
  }
  return result;
}

app.get("/", async (req, res) => {
  const data = await fetchData();
  const pokemon = await fetchPokemon(data);
  res.render("random", { pokemon });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  console.log("http://localhost:5000/");
});
