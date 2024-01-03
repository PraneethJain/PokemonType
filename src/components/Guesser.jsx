/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Guesser.css";

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const useRandomPokemon = (generations) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let validPokemon = [];
    generations.forEach((val, idx) => {
      if (val) {
        switch (idx + 1) {
          case 1:
            validPokemon.push(...range(1, 151));
            break;
          case 2:
            validPokemon.push(...range(152, 251));
            break;
          case 3:
            validPokemon.push(...range(252, 386));
            break;
          case 4:
            validPokemon.push(...range(387, 493));
            break;
          case 5:
            validPokemon.push(...range(494, 649));
            break;
          case 6:
            validPokemon.push(...range(650, 721));
            break;
          case 7:
            validPokemon.push(...range(722, 809));
            break;
          case 8:
            validPokemon.push(...range(810, 905));
            break;
          default:
            throw new Error("invalid generation number");
        }
      }
    });

    fetch(
      `https://pokeapi.co/api/v2/pokemon/${
        validPokemon[Math.floor(Math.random() * validPokemon.length)]
      }`
    )
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
  }, [generations]);

  return { pokemonData, error, loading };
};

function Guesser({ generations }) {
  const { pokemonData, error, loading } = useRandomPokemon(generations);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  const name = pokemonData.name;
  const spriteURL = pokemonData.sprites.other.showdown.front_default;

  return (
    <>
      <img src={spriteURL} alt={name} className="sprite" />
      {name}
    </>
  );
}

export { Guesser };
