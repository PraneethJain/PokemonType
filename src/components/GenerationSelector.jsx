/* eslint-disable react/prop-types */
import "./GenerationSelector.css";

function Circle({ filled }) {
  let backgroundColor = filled ? "white" : "transparent";
  let style = { backgroundColor };

  return <span className="dot" style={style}></span>;
}

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
          <Circle filled={val}></Circle>
          Gen {idx + 1}
        </div>
      ))}
    </div>
  );
}

export { GenerationSelector };
