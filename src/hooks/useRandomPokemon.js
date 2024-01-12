import { useState } from "react";

const useRandomPokemon = (pokedexNum) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      } else {
        return response.json();
      }
    })
    .then((response) => setPokemonData(response))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));

  return { pokemonData, error, loading };
};

export { useRandomPokemon };
