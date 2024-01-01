import { GenerationSelector } from "./components/GenerationSelector";
import { useState } from "react";
import "./App.css";

function App() {
  const [generations, setGenerations] = useState(Array(8).fill(true));

  return (
    <>
      <GenerationSelector
        generations={generations}
        setGenerations={setGenerations}
      ></GenerationSelector>
    </>
  );
}

export default App;
