import { GenerationSelector } from "./components/GenerationSelector";
import { Guesser } from "./components/Guesser";
import { useEffect, useState } from "react";
import githubImage from "./assets/github.png";
import "./App.css";

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const generatePokedexNum = (generations) => {
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
  return validPokemon[Math.floor(Math.random() * validPokemon.length)];
};

function App() {
  document.getElementById("bg").volume = 0.1;

  const [generations, setGenerations] = useState(Array(8).fill(true));

  const [pokedexNum, setPokedexNum] = useState(generatePokedexNum(generations));
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setPokedexNum(generatePokedexNum(generations));
  }, [toggle, generations]);

  return (
    <>
      <div className="top">
        <GenerationSelector
          generations={generations}
          setGenerations={setGenerations}
        ></GenerationSelector>
        <div className="text-info">Guess the Pokémon&apos;s types</div>
      </div>
      <div className="middle">
        <Guesser pokedexNum={pokedexNum} setToggle={setToggle} />
      </div>
      <div className="bottom">
        <div className="left">
          <a href="https://www.google.com">
            <img src={githubImage} alt="github" />
          </a>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default App;
