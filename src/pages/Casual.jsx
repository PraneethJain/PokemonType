import { GenerationSelector } from "../components/GenerationSelector";
import { Guesser } from "../components/Guesser";
import { getRandomPokedexNum } from "../utils/validPokemon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import githubImage from "../assets/github.png";
import "./Casual.css";

function App() {
  const [generations, setGenerations] = useState(Array(8).fill(true));
  const [selected, setSelected] = useState(Array(18).fill(false));
  const [pokedexNum, setPokedexNum] = useState(
    getRandomPokedexNum(generations)
  );

  useEffect(() => {
    const bgMusic = new Audio("/bg.mp3");
    bgMusic.volume = 0.1;
    bgMusic.loop = true;
    bgMusic.play();

    return () => {
      bgMusic.src = "";
    };
  }, []);

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
          skippable={true}
        />
      </div>
      <div className="bottom">
        <div className="left">
          <a href="https://github.com/PraneethJain/PokemonType">
            <img src={githubImage} alt="github" />
          </a>
        </div>
        <div className="right">
          <Link to="/" className="homelink">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
