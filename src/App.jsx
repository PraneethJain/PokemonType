import { GenerationSelector } from "./components/GenerationSelector";
import { Guesser } from "./components/Guesser";
import { getRandomPokedexNum } from "./validPokemon";
import { useState } from "react";
import githubImage from "./assets/github.png";
import "./App.css";

function App() {
  const [generations, setGenerations] = useState(Array(8).fill(true));
  const [selected, setSelected] = useState(Array(18).fill(false));
  const [pokedexNum, setPokedexNum] = useState(
    getRandomPokedexNum(generations)
  );

  return (
    <div className="app">
      <div className="top">
        <GenerationSelector
          generations={generations}
          setGenerations={setGenerations}
          pokedexNum={pokedexNum}
          setPokedexNum={setPokedexNum}
          setSelected={setSelected}
        ></GenerationSelector>
        <div className="text-info">Guess the Pokémon&apos;s types</div>
      </div>
      <div className="middle">
        <Guesser
          pokedexNum={pokedexNum}
          setPokedexNum={setPokedexNum}
          selected={selected}
          setSelected={setSelected}
          generations={generations}
        />
      </div>
      <div className="bottom">
        <div className="left">
          <a href="https://github.com/PraneethJain/PokemonType">
            <img src={githubImage} alt="github" />
          </a>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
