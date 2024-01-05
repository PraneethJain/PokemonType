import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./index.css";

document.getElementById("bg").volume = 0.1; // temporary, only play bg after logging in

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
