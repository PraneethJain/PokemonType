import PropTypes from "prop-types";
import { useState } from "react";
import "./Guesser.css";
import { useRandomPokemon } from "../hooks/useRandomPokemon";
import { getRandomPokedexNum } from "../utils/validPokemon";

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
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

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

function Buttons({
  correctTypes,
  selected,
  setSelected,
  setPokedexNum,
  generations,
  skippable,
}) {
  const [skipped, setSkipped] = useState(false);

  const check = () => {
    const selectedTypes = types
      .filter((_, idx) => selected[idx])
      .map((type) => type.toLowerCase());

    if (
      correctTypes.every((type) => selectedTypes.includes(type)) &&
      selectedTypes.every((type) => correctTypes.includes(type))
    ) {
      correctGuessSound.currentTime = 0;
      correctGuessSound.play();
      setSelected(Array(18).fill(false));
      setPokedexNum(getRandomPokedexNum(generations));
      setSkipped(false);
    } else {
      wrongGuessSound.currentTime = 0.6;
      wrongGuessSound.play();
    }
  };

  const skip = () => {
    setSkipped(true);
    let newSelected = Array(18).fill(false);
    for (let i = 0; i < newSelected.length; ++i) {
      if (correctTypes.includes(types[i])) {
        newSelected[i] = true;
      }
      selectSound.currentTime = 0.08;
      selectSound.play();
    }
    setSelected(newSelected);
  };

  const next = () => {
    selectSound.currentTime = 0.08;
    selectSound.play();
    setSelected(Array(18).fill(false));
    setPokedexNum(getRandomPokedexNum(generations));
    setSkipped(false);
  };

  let buttons;
  if (skippable) {
    if (skipped) {
      buttons = (
        <button className="next-button" onClick={next}>
          Next
        </button>
      );
    } else {
      buttons = (
        <>
          <button className="guess-button" onClick={check}>
            Guess
          </button>
          <button className="skip-button" onClick={skip}>
            Give Up
          </button>
        </>
      );
    }
  } else {
    buttons = (
      <button className="guess-button" onClick={check}>
        Guess
      </button>
    );
  }

  return <div className="buttons">{buttons}</div>;
}

Buttons.propTypes = {
  correctTypes: PropTypes.arrayOf(PropTypes.bool),
  selected: PropTypes.arrayOf(PropTypes.bool),
  setSelected: PropTypes.func,
  setPokedexNum: PropTypes.func,
  generations: PropTypes.arrayOf(PropTypes.bool),
  skippable: PropTypes.bool,
};

function Guesser({
  pokedexNum,
  setPokedexNum,
  selected,
  setSelected,
  generations,
  skippable,
}) {
  const { pokemonData, error, loading } = useRandomPokemon(pokedexNum);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  const name = pokemonData.name;
  const spriteURL = pokemonData.sprites.other.showdown.front_default;

  return (
    <div className="guesser">
      <TypeSelector selected={selected} setSelected={setSelected} />
      <PokeInfo name={name} spriteURL={spriteURL} />
      <Buttons
        correctTypes={pokemonData.types.map((x) => x.type.name)}
        selected={selected}
        setSelected={setSelected}
        setPokedexNum={setPokedexNum}
        generations={generations}
        skippable={skippable}
      />
    </div>
  );
}

Guesser.propTypes = {
  pokedexNum: PropTypes.number.isRequired,
  setPokedexNum: PropTypes.func,
  setToggle: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelected: PropTypes.func.isRequired,
  generations: PropTypes.arrayOf(PropTypes.bool).isRequired,
  skippable: PropTypes.bool.isRequired,
};

export { Guesser };
