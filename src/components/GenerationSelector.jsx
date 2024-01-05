import PropTypes from "prop-types";
import "./GenerationSelector.css";

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

function GenerationSelector({ generations, setGenerations }) {
  let updateGenerations = (idx) => {
    let nextGenerations = generations.slice();
    nextGenerations[idx] = !nextGenerations[idx];
    setGenerations(nextGenerations);
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
};

export { GenerationSelector };
