import PropTypes from "prop-types";
import { useEffect } from "react";
import "./GenerationSelector.css";
import { getValidPokemon } from "../utils/validPokemon";

function Generation({ filled, idx }) {
  return (
    <>
      <span
        className="dot"
        style={{ backgroundColor: filled ? "white" : "transparent" }}
      ></span>{" "}
      Gen {idx + 1}
    </>
  );
}

Generation.propTypes = {
  filled: PropTypes.bool,
  idx: PropTypes.number.isRequired,
};

Generation.defaultProps = {
  filled: false,
};

function GenerationSelector({
  generations,
  setGenerations,
  pokedexNum,
  setPokedexNum,
  setSelected,
}) {
  // Load saved generations from localStorage on mount
  useEffect(() => {
    const savedGenerations = localStorage.getItem("generations");
    if (savedGenerations) {
      try {
        const parsed = JSON.parse(savedGenerations);
        if (Array.isArray(parsed) && parsed.length === generations.length) {
          setGenerations(parsed);
        }
      } catch (e) {
        console.error("Error parsing saved generations:", e);
      }
    }
  }, []); // run once on mount

  let updateGenerations = (idx) => {
    let nextGenerations = generations.slice();
    nextGenerations[idx] = !nextGenerations[idx];
    setGenerations(nextGenerations);

    // Save new state to localStorage
    localStorage.setItem("generations", JSON.stringify(nextGenerations));

    const validPokemon = getValidPokemon(nextGenerations);
    if (validPokemon.includes(pokedexNum)) return;

    setSelected(Array(18).fill(false));
    setPokedexNum(
      validPokemon[Math.floor(Math.random() * validPokemon.length)]
    );
  };

  return (
    <div className="container">
      {generations.map((val, idx) => (
        <div
          key={idx} // generations will never be reordered, so using index as key is fine
          onClick={() => updateGenerations(idx)}
          className="generation"
        >
          <Generation filled={val} idx={idx}></Generation>
        </div>
      ))}
    </div>
  );
}

GenerationSelector.propTypes = {
  generations: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setGenerations: PropTypes.func.isRequired,
  pokedexNum: PropTypes.number,
  setPokedexNum: PropTypes.func,
  setSelected: PropTypes.func,
};

export { GenerationSelector };
