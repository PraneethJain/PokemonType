/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Guesser.css";

const gallery = Object.values(
  import.meta.glob("@assets/types/*.{png,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    as: "url",
  })
);

const types = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

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

function Type({ idx, selected, setSelected }) {
  const toggleSelected = () => {
    if (!selected[idx] && selected.reduce((res, a) => res + a, 0) == 2) {
      return;
    }
    let nextSelected = selected.slice();
    nextSelected[idx] = !nextSelected[idx];
    setSelected(nextSelected);
  };
  return (
    <div
      className={"type " + (selected[idx] ? "selected" : "")}
      onClick={toggleSelected}
    >
      <img src={gallery[idx]}></img>
    </div>
  );
}

function TypeSelector({ selected, setSelected }) {
  return (
    <div className="types">
      {types.map((_, idx) => (
        <Type
          idx={idx}
          selected={selected}
          setSelected={setSelected}
          key={idx}
        />
      ))}
    </div>
  );
}

function PokeInfo({ name, spriteURL }) {
  return (
    <div className="poke-info">
      <img src={spriteURL} alt={name} className="sprite" />
      {name}
    </div>
  );
}

function Guesser({ pokedexNum, setToggle }) {
  const { pokemonData, error, loading } = useRandomPokemon(pokedexNum);
  const [selected, setSelected] = useState(Array(types.length).fill(false));

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  const name = pokemonData.name;
  const spriteURL = pokemonData.sprites.other.showdown.front_default;
  const correctTypes = pokemonData.types.map((x) => x.type.name);

  const check = () => {
    const selectedTypes = types
      .filter((_, idx) => selected[idx])
      .map((type) => type.toLowerCase());

    console.log(selectedTypes);
    console.log(correctTypes);

    if (
      correctTypes.every((type) => selectedTypes.includes(type)) &&
      selectedTypes.every((type) => correctTypes.includes(type))
    ) {
      selected.fill(false);
      setToggle((toggle) => !toggle);
    } else {
      // TODO: inform the player that he is wrong
    }
  };

  return (
    <div className="guesser">
      <TypeSelector selected={selected} setSelected={setSelected} />
      <PokeInfo name={name} spriteURL={spriteURL} />
      <div className="buttons">
        <button className="guess-button" onClick={check}>
          Guess
        </button>
      </div>
    </div>
  );
}

export { Guesser };
