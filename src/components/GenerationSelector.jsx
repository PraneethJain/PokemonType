/* eslint-disable react/prop-types */
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

export { GenerationSelector };
