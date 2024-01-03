import { GenerationSelector } from "./components/GenerationSelector";
import { Guesser } from "./components/Guesser";
import { useState } from "react";
import "./App.css";

function App() {
  const [generations, setGenerations] = useState(Array(8).fill(true));

  return (
    <>
      <div className="top">
        <GenerationSelector
          generations={generations}
          setGenerations={setGenerations}
        ></GenerationSelector>
      </div>
      <div className="middle">
        <Guesser generations={generations} />
      </div>
      <div className="bottom">bottom</div>
    </>
  );
}

export default App;
