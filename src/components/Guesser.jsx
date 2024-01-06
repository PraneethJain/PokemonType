import PropTypes from "prop-types";
import { useState } from "react";
import "./Guesser.css";

const correctGuessSound = new Audio("/correct_guess.mp3");
const wrongGuessSound = new Audio("/wrong_guess.mp3");
const selectSound = new Audio("/select.mp3");
selectSound.volume = 0.4;
wrongGuessSound.volume = 0.6;

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
    selectSound.currentTime = 0.08;
    selectSound.play();

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

Type.propTypes = {
  idx: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelected: PropTypes.func.isRequired,
};

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

TypeSelector.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelected: PropTypes.func.isRequired,
};

function PokeInfo({ name, spriteURL }) {
  return (
    <div className="poke-info">
      <img src={spriteURL} alt={name} className="sprite" />
      {name}
    </div>
  );
}

PokeInfo.propTypes = {
  name: PropTypes.string.isRequired,
  spriteURL: PropTypes.string.isRequired,
};

function Guesser({ pokedexNum, setToggle, selected, setSelected }) {
  const { pokemonData, error, loading } = useRandomPokemon(pokedexNum);

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
      correctGuessSound.currentTime = 0;
      correctGuessSound.play();
      setToggle((toggle) => !toggle);
    } else {
      wrongGuessSound.currentTime = 0.6;
      wrongGuessSound.play();
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

Guesser.propTypes = {
  pokedexNum: PropTypes.number.isRequired,
  setToggle: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelected: PropTypes.func,
};

export { Guesser };
